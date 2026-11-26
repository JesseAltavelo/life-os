import SwiftUI
import WebKit
import WidgetKit
import AVFoundation
import AudioToolbox

struct WebView: UIViewRepresentable {
    let url: URL

    func makeCoordinator() -> Coordinator { Coordinator() }

    /// Set by makeUIView so deep links (lifeos://focus) can change the page.
    static weak var current: WKWebView?
    static func open(route: String) {
        let allowed = Set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_-:%.@")
        let safe = String(route.filter { allowed.contains($0) })
        guard let data = try? JSONSerialization.data(withJSONObject: ["#/" + safe]),
              let arr = String(data: data, encoding: .utf8) else { return }
        current?.evaluateJavaScript("location.hash=\(arr)[0]")
    }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        config.websiteDataStore = .default()
        // The web app posts to window.webkit.messageHandlers.lifeos
        config.userContentController.add(context.coordinator, name: "lifeos")

        let web = WKWebView(frame: .zero, configuration: config)
        web.navigationDelegate = context.coordinator
        web.uiDelegate = context.coordinator
        web.scrollView.contentInsetAdjustmentBehavior = .never // the page handles safe areas itself
        web.allowsBackForwardNavigationGestures = false
        if #available(iOS 16.4, *) { web.isInspectable = true } // debug from Safari on the Mac
        web.load(URLRequest(url: url))
        WebView.current = web
        return web
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKScriptMessageHandler, WKNavigationDelegate, WKUIDelegate {
        var previewPlayer: AVAudioPlayer?

        // MARK: messages from the web app
        func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
            guard let msg = message.body as? [String: Any], let type = msg["t"] as? String else { return }
            let end = (msg["end"] as? NSNumber)?.doubleValue ?? 0
            switch type {
            case "timer":
                let label = (msg["label"] as? String) ?? ""
                let kind = (msg["kind"] as? String) ?? "rest"
                let start = (msg["start"] as? NSNumber)?.doubleValue ?? Date().timeIntervalSince1970 * 1000
                let useAlarm = (msg["alarm"] as? Bool) ?? (kind == "rest")
                if useAlarm {
                    // Rings like the Clock timer, also in silent mode
                    Alarms.shared.set(endMs: end, title: label.isEmpty ? "Time is up" : label,
                                      sound: (msg["snd"] as? String) ?? "")
                    Notifier.shared.schedule(id: "timer", endMs: 0, title: "", body: "")
                } else {
                    Alarms.shared.set(endMs: 0, title: "")
                    Notifier.shared.schedule(id: "timer", endMs: end, title: "Next step",
                                             body: label.isEmpty ? "Your timer finished." : "\(label) finished.")
                }
                Task { @MainActor in
                    Live.shared.set(slot: "timer", kind: kind, title: label.isEmpty ? "Timer" : label,
                                    subtitle: (msg["sub"] as? String) ?? "", startMs: start, endMs: end,
                                    next: (msg["next"] as? String) ?? "", info: (msg["info"] as? String) ?? "")
                }
            case "focus":
                let to = (msg["to"] as? String) ?? ""
                let from = (msg["from"] as? String) ?? ""
                let start = (msg["start"] as? NSNumber)?.doubleValue ?? 0
                Notifier.shared.schedule(id: "focus", endMs: end, title: "You landed",
                                         body: to.isEmpty ? "Your focus flight is done." : "Welcome to \(to). Open Life OS to collect your stamp.")
                Task { @MainActor in
                    Live.shared.set(slot: "focus", kind: "focus", title: "\(from) to \(to)",
                                    subtitle: "Focus flight", startMs: start, endMs: end,
                                    next: (msg["next"] as? String) ?? "", info: (msg["info"] as? String) ?? "")
                }
            case "summary":
                if let d = msg["d"] as? [String: Any] {
                    func num(_ v: Any?) -> Double { (v as? NSNumber)?.doubleValue ?? Double((v as? String) ?? "") ?? 0 }
                    func n(_ k: String) -> Int { Int(num(d[k])) }
                    let evs: [CalEvent] = ((d["ev"] as? [[String: Any]]) ?? []).compactMap { x in
                        guard let t = x["t"] as? String else { return nil }
                        let s = num(x["s"]), e = num(x["e"])
                        guard s > 0, e > 0 else { return nil }
                        return CalEvent(t: t, s: Date(timeIntervalSince1970: s / 1000), e: Date(timeIntervalSince1970: e / 1000),
                                        h: x["h"] == nil ? 215 : num(x["h"]), l: (x["l"] as? NSNumber)?.boolValue ?? false,
                                        r: (x["r"] as? String) ?? "plan")
                    }
                    TodaySummary(focusMin: n("fm"), focusGoal: n("fg"), steps: n("st"), stepsT: n("stT"),
                                 water: n("w"), waterT: n("wT"), kcal: n("k"), kcalT: n("kT"),
                                 streak: n("sk"), city: (d["city"] as? String) ?? "", updated: .now, events: evs,
                                 risk: ((d["risk"] as? [[String: Any]]) ?? []).map {
                                     RiskItem(n: ($0["n"] as? String) ?? "", v: ($0["v"] as? String) ?? "", p: num($0["p"]))
                                 }).save()
                    WidgetCenter.shared.reloadAllTimelines()
                }
            case "preview":
                let snd = (msg["snd"] as? String) ?? ""
                if snd.isEmpty {
                    AudioServicesPlayAlertSound(1005)
                } else if let url = Bundle.main.url(forResource: snd, withExtension: "caf") {
                    try? AVAudioSession.sharedInstance().setCategory(.playback, options: [.mixWithOthers])
                    try? AVAudioSession.sharedInstance().setActive(true)
                    previewPlayer = try? AVAudioPlayer(contentsOf: url)
                    previewPlayer?.play()
                    DispatchQueue.main.asyncAfter(deadline: .now() + 3) { [weak self] in self?.previewPlayer?.stop() }
                }
            case "export":
                guard let name = msg["name"] as? String, let data = msg["data"] as? String else { return }
                let url = FileManager.default.temporaryDirectory.appendingPathComponent(name)
                try? data.write(to: url, atomically: true, encoding: .utf8)
                present(UIActivityViewController(activityItems: [url], applicationActivities: nil))
            default:
                break
            }
        }

        // MARK: links: app links (whatsapp://) and other sites open outside
        func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            guard let url = action.request.url else { return decisionHandler(.allow) }
            let scheme = url.scheme?.lowercased() ?? ""
            if !["http", "https", "about", "data", "blob"].contains(scheme) {
                UIApplication.shared.open(url)
                return decisionHandler(.cancel)
            }
            if action.navigationType == .linkActivated, url.host != lifeOSURL.host {
                UIApplication.shared.open(url)
                return decisionHandler(.cancel)
            }
            decisionHandler(.allow)
        }

        // target=_blank links
        func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                     for action: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
            if let url = action.request.url { UIApplication.shared.open(url) }
            return nil
        }

        // MARK: alert / confirm / prompt (the web app uses all three)
        private func present(_ alert: UIViewController) {
            let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene
            var top = scene?.windows.first(where: { $0.isKeyWindow })?.rootViewController
            while let next = top?.presentedViewController { top = next }
            top?.present(alert, animated: true)
        }

        func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String,
                     initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
            let a = UIAlertController(title: nil, message: message, preferredStyle: .alert)
            a.addAction(UIAlertAction(title: "OK", style: .default) { _ in completionHandler() })
            present(a)
        }

        func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String,
                     initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
            let a = UIAlertController(title: nil, message: message, preferredStyle: .alert)
            a.addAction(UIAlertAction(title: "Cancel", style: .cancel) { _ in completionHandler(false) })
            a.addAction(UIAlertAction(title: "OK", style: .default) { _ in completionHandler(true) })
            present(a)
        }

        func webView(_ webView: WKWebView, runJavaScriptTextInputPanelWithPrompt prompt: String,
                     defaultText: String?, initiatedByFrame frame: WKFrameInfo,
                     completionHandler: @escaping (String?) -> Void) {
            let a = UIAlertController(title: nil, message: prompt, preferredStyle: .alert)
            a.addTextField { $0.text = defaultText }
            a.addAction(UIAlertAction(title: "Cancel", style: .cancel) { _ in completionHandler(nil) })
            a.addAction(UIAlertAction(title: "OK", style: .default) { _ in completionHandler(a.textFields?.first?.text) })
            present(a)
        }
    }
}

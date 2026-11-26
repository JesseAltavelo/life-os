import SwiftUI
import WebKit
import WidgetKit

struct WebView: UIViewRepresentable {
    let url: URL

    func makeCoordinator() -> Coordinator { Coordinator() }

    /// Set by makeUIView so deep links (lifeos://focus) can change the page.
    static weak var current: WKWebView?
    static func open(route: String) {
        let safe = route.filter { $0.isLetter || $0.isNumber }
        current?.evaluateJavaScript("location.hash='#/\(safe)'")
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

        // MARK: messages from the web app
        func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
            guard let msg = message.body as? [String: Any], let type = msg["t"] as? String else { return }
            let end = (msg["end"] as? Double) ?? 0
            switch type {
            case "timer":
                let label = (msg["label"] as? String) ?? ""
                let kind = (msg["kind"] as? String) ?? "rest"
                let start = (msg["start"] as? Double) ?? Date().timeIntervalSince1970 * 1000
                if kind == "rest" {
                    // Rings like the Clock timer, also in silent mode
                    Alarms.shared.set(endMs: end, title: label.isEmpty ? "Rest is over" : label)
                    Notifier.shared.schedule(id: "timer", endMs: 0, title: "", body: "")
                } else {
                    Notifier.shared.schedule(id: "timer", endMs: end, title: "Next step",
                                             body: label.isEmpty ? "Your timer finished." : "\(label) finished.")
                }
                Task { @MainActor in
                    Live.shared.set(slot: "timer", kind: kind, title: label.isEmpty ? "Timer" : label,
                                    subtitle: (msg["sub"] as? String) ?? "", startMs: start, endMs: end)
                }
            case "focus":
                let to = (msg["to"] as? String) ?? ""
                let from = (msg["from"] as? String) ?? ""
                let start = (msg["start"] as? Double) ?? 0
                Notifier.shared.schedule(id: "focus", endMs: end, title: "You landed",
                                         body: to.isEmpty ? "Your focus flight is done." : "Welcome to \(to). Open Life OS to collect your stamp.")
                Task { @MainActor in
                    Live.shared.set(slot: "focus", kind: "focus", title: "\(from) to \(to)",
                                    subtitle: "Focus flight", startMs: start, endMs: end)
                }
            case "summary":
                if let d = msg["d"] as? [String: Any] {
                    func n(_ k: String) -> Int { Int((d[k] as? Double) ?? 0) }
                    TodaySummary(focusMin: n("fm"), focusGoal: n("fg"), steps: n("st"), stepsT: n("stT"),
                                 water: n("w"), waterT: n("wT"), kcal: n("k"), kcalT: n("kT"),
                                 streak: n("sk"), city: (d["city"] as? String) ?? "", updated: .now).save()
                    WidgetCenter.shared.reloadAllTimelines()
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

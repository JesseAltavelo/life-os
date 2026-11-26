import SwiftUI
import UserNotifications

/// Native shell around the Life OS web app.
/// The web app runs unchanged inside a WKWebView; it sends small messages
/// (timer started, flight took off) that this shell turns into local
/// notifications, and later Live Activities and widget data.
let lifeOSURL = URL(string: "https://jessealtavelo.github.io/life-os/")!

@main
struct LifeOSApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var delegate

    var body: some Scene {
        WindowGroup {
            WebView(url: lifeOSURL)
                .ignoresSafeArea()
                .onOpenURL { url in
                    if url.host == "open", let h = URLComponents(url: url, resolvingAgainstBaseURL: false)?
                        .queryItems?.first(where: { $0.name == "h" })?.value {
                        WebView.open(route: h)
                    } else {
                        WebView.open(route: url.host ?? "plan")
                    }
                }
        }
    }
}

final class AppDelegate: NSObject, UIApplicationDelegate, UNUserNotificationCenterDelegate {
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        UNUserNotificationCenter.current().delegate = self
        Notifier.shared.requestPermission()
        Task { @MainActor in Live.shared.endAll() }
        return true
    }

    // Show the banner even when the app is open (the web app beeps too).
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification) async -> UNNotificationPresentationOptions {
        [.banner, .list]
    }
}

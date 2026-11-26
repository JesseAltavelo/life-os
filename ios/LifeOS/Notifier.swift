import Foundation
import UserNotifications

/// Schedules local notifications on the phone. No server, no paid account.
final class Notifier {
    static let shared = Notifier()

    func requestPermission() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { _, _ in }
    }

    /// Replaces the pending notification with this id. `endMs` is a JS timestamp
    /// (milliseconds since 1970); 0 cancels it.
    func schedule(id: String, endMs: Double, title: String, body: String) {
        let center = UNUserNotificationCenter.current()
        center.removePendingNotificationRequests(withIdentifiers: [id])
        guard endMs > 0 else { return }
        let seconds = endMs / 1000 - Date().timeIntervalSince1970
        guard seconds > 0.5 else { return }

        let content = UNMutableNotificationContent()
        content.title = title
        content.body = body
        content.sound = .default
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: seconds, repeats: false)
        center.add(UNNotificationRequest(identifier: id, content: content, trigger: trigger))
    }
}

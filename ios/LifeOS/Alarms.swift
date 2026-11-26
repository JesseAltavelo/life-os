import AlarmKit
import Foundation
import SwiftUI

@available(iOS 26.0, *)
struct RestMeta: AlarmMetadata {}

/// Rest-timer alarm like the Clock app's timer: rings even in silent mode.
final class Alarms {
    static let shared = Alarms()
    private var currentID: UUID?

    func set(endMs: Double, title: String, sound: String = "") {
        guard #available(iOS 26.0, *) else { return }
        if let id = currentID { try? AlarmManager.shared.cancel(id: id); currentID = nil }
        guard endMs > 0 else { return }
        let date = Date(timeIntervalSince1970: endMs / 1000)
        guard date.timeIntervalSinceNow > 1 else { return }
        let id = UUID()
        currentID = id
        Task {
            do {
                let mgr = AlarmManager.shared
                if mgr.authorizationState == .notDetermined { _ = try await mgr.requestAuthorization() }
                guard mgr.authorizationState == .authorized, self.currentID == id else { return }
                let alert = AlarmPresentation.Alert(
                    title: LocalizedStringResource(stringLiteral: title),
                    stopButton: AlarmButton(text: "Done", textColor: .white, systemImageName: "checkmark"))
                let attrs = AlarmAttributes<RestMeta>(presentation: AlarmPresentation(alert: alert),
                                                      metadata: RestMeta(), tintColor: .blue)
                _ = try await mgr.schedule(id: id, configuration: .alarm(schedule: .fixed(date), attributes: attrs,
                                                                         sound: sound.isEmpty ? .default : .named("\(sound).caf")))
            } catch {}
        }
    }
}

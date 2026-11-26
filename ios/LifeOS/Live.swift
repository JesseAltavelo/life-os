import ActivityKit
import Foundation

/// Starts, updates and ends Live Activities on the phone (no push server needed).
@MainActor
final class Live {
    static let shared = Live()
    private var current: [String: Activity<LifeOSActivity>] = [:]

    func set(slot: String, kind: String, title: String, subtitle: String, startMs: Double, endMs: Double) {
        if endMs <= 0 {
            if let a = current[slot] { Task { await a.end(nil, dismissalPolicy: .immediate) } }
            current[slot] = nil
            return
        }
        let state = LifeOSActivity.ContentState(
            title: title, subtitle: subtitle,
            start: Date(timeIntervalSince1970: startMs / 1000),
            end: Date(timeIntervalSince1970: endMs / 1000))
        let content = ActivityContent(state: state, staleDate: state.end.addingTimeInterval(120))
        if let a = current[slot] {
            Task { await a.update(content) }
            return
        }
        guard ActivityAuthorizationInfo().areActivitiesEnabled else { return }
        current[slot] = try? Activity.request(attributes: LifeOSActivity(kind: kind), content: content, pushType: nil)
    }

    /// Clears activities left over from a previous run.
    func endAll() {
        for a in Activity<LifeOSActivity>.activities { Task { await a.end(nil, dismissalPolicy: .immediate) } }
        current = [:]
    }
}

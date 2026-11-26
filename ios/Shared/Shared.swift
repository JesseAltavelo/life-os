import ActivityKit
import Foundation

/// Live Activity shown on the lock screen and in the Dynamic Island.
struct LifeOSActivity: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var title: String
        var subtitle: String
        var start: Date
        var end: Date
        var next: String = ""
        var info: String = ""
    }
    /// "rest", "step" or "focus"
    var kind: String
}

enum Shared {
    /// SideStore rewrites the group id when it re-signs and records it in ALTAppGroups.
    static let group: String = (Bundle.main.object(forInfoDictionaryKey: "ALTAppGroups") as? [String])?.first ?? "group.com.jroque.lifeos"
    static var defaults: UserDefaults? { UserDefaults(suiteName: group) }
}

/// One calendar event for the calendar widget. `r` is the Life OS route to open.
struct CalEvent: Codable, Hashable {
    var t: String
    var s: Date
    var e: Date
    var h: Double
    var l: Bool
    var r: String
}

/// Today's numbers, sent by the web app and shown in the widgets.
struct TodaySummary: Codable {
    var focusMin: Int
    var focusGoal: Int
    var steps: Int
    var stepsT: Int
    var water: Int
    var waterT: Int
    var kcal: Int
    var kcalT: Int
    var streak: Int
    var city: String
    var updated: Date
    var events: [CalEvent]? = nil

    static let sample = TodaySummary(focusMin: 80, focusGoal: 180, steps: 6200, stepsT: 10000,
                                     water: 1500, waterT: 2500, kcal: 1900, kcalT: 3300,
                                     streak: 3, city: "Amsterdam", updated: .now)

    static func load() -> TodaySummary? {
        guard let data = Shared.defaults?.data(forKey: "today") else { return nil }
        return try? JSONDecoder().decode(TodaySummary.self, from: data)
    }

    func save() {
        if let data = try? JSONEncoder().encode(self) { Shared.defaults?.set(data, forKey: "today") }
    }
}

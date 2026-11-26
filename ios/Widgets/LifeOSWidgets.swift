import ActivityKit
import SwiftUI
import WidgetKit

// MARK: - data

struct TodayEntry: TimelineEntry {
    let date: Date
    let s: TodaySummary?
}

struct TodayProvider: TimelineProvider {
    func placeholder(in context: Context) -> TodayEntry { TodayEntry(date: .now, s: .sample) }
    func getSnapshot(in context: Context, completion: @escaping (TodayEntry) -> Void) {
        completion(TodayEntry(date: .now, s: TodaySummary.load() ?? .sample))
    }
    func getTimeline(in context: Context, completion: @escaping (Timeline<TodayEntry>) -> Void) {
        let e = TodayEntry(date: .now, s: TodaySummary.load())
        completion(Timeline(entries: [e], policy: .after(.now.addingTimeInterval(30 * 60))))
    }
}

private let accent = Color(red: 0.23, green: 0.42, blue: 0.93)
private func hrs(_ m: Int) -> String { String(format: "%.1f", Double(m) / 60) }
private func k(_ n: Int) -> String { n >= 1000 ? String(format: "%.1fk", Double(n) / 1000) : "\(n)" }
private func frac(_ a: Int, _ b: Int) -> Double { b > 0 ? min(1, Double(a) / Double(b)) : 0 }

struct Bar: View {
    let label: String, value: String, p: Double
    var body: some View {
        VStack(alignment: .leading, spacing: 3) {
            HStack {
                Text(label).font(.caption2).foregroundStyle(.secondary)
                Spacer()
                Text(value).font(.caption2.monospacedDigit()).bold()
            }
            ProgressView(value: p).tint(p >= 1 ? .green : accent)
        }
    }
}

// MARK: - Today widget (home and lock screen)

struct TodayView: View {
    @Environment(\.widgetFamily) var family
    let entry: TodayEntry

    var body: some View {
        let s = entry.s ?? .sample
        let noData = entry.s == nil
        switch family {
        case .accessoryCircular:
            Gauge(value: frac(s.focusMin, s.focusGoal)) {
                Image(systemName: "airplane")
            } currentValueLabel: {
                Text(hrs(s.focusMin))
            }
            .gaugeStyle(.accessoryCircularCapacity)
        case .accessoryInline:
            Text("Focus \(hrs(s.focusMin)) h · \(k(s.steps)) steps")
        case .accessoryRectangular:
            VStack(alignment: .leading, spacing: 2) {
                Text("Focus \(hrs(s.focusMin)) / \(hrs(s.focusGoal)) h").font(.headline)
                Text("\(k(s.steps)) steps · \(String(format: "%.1f", Double(s.water) / 1000)) L")
                Text("\(s.kcal) / \(s.kcalT) kcal").foregroundStyle(.secondary)
            }
        case .systemSmall:
            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Image(systemName: "airplane").foregroundStyle(accent)
                    Spacer()
                    if s.streak > 0 {
                        Label("\(s.streak)", systemImage: "flame.fill").font(.caption).foregroundStyle(.orange)
                    }
                }
                Spacer()
                Text("\(hrs(s.focusMin)) h").font(.system(size: 30, weight: .semibold, design: .monospaced))
                Text(noData ? "Open Life OS once" : "of \(hrs(s.focusGoal)) h focus").font(.caption).foregroundStyle(.secondary)
                ProgressView(value: frac(s.focusMin, s.focusGoal)).tint(accent)
            }
        default:
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text("Today").font(.headline)
                    Spacer()
                    if s.streak > 0 {
                        Label("\(s.streak)-day streak", systemImage: "flame.fill").font(.caption).foregroundStyle(.orange)
                    }
                }
                Bar(label: "Focus", value: "\(hrs(s.focusMin)) / \(hrs(s.focusGoal)) h", p: frac(s.focusMin, s.focusGoal))
                Bar(label: "Steps", value: "\(s.steps) / \(s.stepsT)", p: frac(s.steps, s.stepsT))
                Bar(label: "Water", value: "\(s.water) / \(s.waterT) ml", p: frac(s.water, s.waterT))
                Bar(label: "Calories", value: "\(s.kcal) / \(s.kcalT)", p: frac(s.kcal, s.kcalT))
            }
        }
    }
}

struct TodayWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "Today", provider: TodayProvider()) { entry in
            TodayView(entry: entry)
                .containerBackground(.fill.tertiary, for: .widget)
                .widgetURL(URL(string: "lifeos://week"))
        }
        .configurationDisplayName("Today")
        .description("Focus, steps, water and calories for today.")
        .supportedFamilies([.systemSmall, .systemMedium, .accessoryCircular, .accessoryRectangular, .accessoryInline])
    }
}

// MARK: - Start a flight

struct FlightView: View {
    @Environment(\.widgetFamily) var family
    let entry: TodayEntry
    var body: some View {
        if family == .accessoryCircular {
            ZStack {
                AccessoryWidgetBackground()
                Image(systemName: "airplane.departure").font(.title3)
            }
        } else {
            VStack(alignment: .leading, spacing: 6) {
                Image(systemName: "airplane.departure").font(.title2).foregroundStyle(accent)
                Spacer()
                Text("Start a flight").font(.headline)
                Text("From \((entry.s ?? .sample).city)").font(.caption).foregroundStyle(.secondary)
            }
        }
    }
}

struct FlightWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "Flight", provider: TodayProvider()) { entry in
            FlightView(entry: entry)
                .containerBackground(.fill.tertiary, for: .widget)
                .widgetURL(URL(string: "lifeos://focus"))
        }
        .configurationDisplayName("Start a flight")
        .description("Opens Work focus in one tap.")
        .supportedFamilies([.systemSmall, .accessoryCircular])
    }
}

// MARK: - Live Activity

private func icon(_ kind: String) -> String {
    kind == "focus" ? "airplane" : kind == "step" ? "figure.flexibility" : "timer"
}

struct LiveView: View {
    let ctx: ActivityViewContext<LifeOSActivity>
    var body: some View {
        let st = ctx.state
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Image(systemName: icon(ctx.attributes.kind)).foregroundStyle(accent)
                VStack(alignment: .leading, spacing: 0) {
                    Text(st.title).font(.headline).lineLimit(1)
                    if !st.subtitle.isEmpty { Text(st.subtitle).font(.caption).foregroundStyle(.secondary).lineLimit(1) }
                }
                Spacer()
                Text(timerInterval: st.start...st.end, countsDown: true)
                    .font(.system(size: 28, weight: .semibold, design: .monospaced))
                    .multilineTextAlignment(.trailing)
                    .frame(width: 110, alignment: .trailing)
            }
            ProgressView(timerInterval: st.start...st.end, countsDown: false) { EmptyView() } currentValueLabel: { EmptyView() }
                .tint(accent)
        }
        .padding(16)
    }
}

struct LifeOSLive: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: LifeOSActivity.self) { ctx in
            LiveView(ctx: ctx)
        } dynamicIsland: { ctx in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Image(systemName: icon(ctx.attributes.kind)).font(.title2).foregroundStyle(accent)
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text(timerInterval: ctx.state.start...ctx.state.end, countsDown: true)
                        .font(.title2.monospacedDigit()).frame(width: 90, alignment: .trailing)
                }
                DynamicIslandExpandedRegion(.bottom) {
                    VStack(alignment: .leading, spacing: 6) {
                        Text(ctx.state.title).font(.headline).lineLimit(1)
                        ProgressView(timerInterval: ctx.state.start...ctx.state.end, countsDown: false) { EmptyView() } currentValueLabel: { EmptyView() }
                            .tint(accent)
                    }
                }
            } compactLeading: {
                Image(systemName: icon(ctx.attributes.kind)).foregroundStyle(accent)
            } compactTrailing: {
                Text(timerInterval: ctx.state.start...ctx.state.end, countsDown: true)
                    .monospacedDigit().frame(width: 44)
            } minimal: {
                Image(systemName: icon(ctx.attributes.kind)).foregroundStyle(accent)
            }
            .widgetURL(URL(string: ctx.attributes.kind == "focus" ? "lifeos://focus" : "lifeos://train"))
        }
    }
}

@main
struct LifeOSWidgets: WidgetBundle {
    var body: some Widget {
        TodayWidget()
        FlightWidget()
        LifeOSLive()
    }
}

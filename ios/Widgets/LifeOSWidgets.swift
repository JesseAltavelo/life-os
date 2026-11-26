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
            ProgressView(value: p).tint(p >= 1 ? .green : p < 0.34 ? .red : .orange)
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
            VStack(alignment: .leading, spacing: 5) {
                HStack {
                    Text("At risk").font(.caption.weight(.bold))
                    Spacer()
                    if s.streak > 0 { Label("\(s.streak)", systemImage: "flame.fill").font(.caption2).foregroundStyle(.orange) }
                }
                ForEach(risks(s).prefix(4), id: \.self) { r in
                    VStack(alignment: .leading, spacing: 2) {
                        HStack(spacing: 4) {
                            Text(r.n).font(.system(size: 11, weight: .semibold)).lineLimit(1)
                            Spacer(minLength: 2)
                            Text(r.v).font(.system(size: 10).monospacedDigit()).foregroundStyle(.secondary).lineLimit(1)
                        }
                        ProgressView(value: r.p).tint(r.p >= 1 ? .green : r.p < 0.34 ? .red : .orange).scaleEffect(x: 1, y: 0.8)
                    }
                }
                Spacer(minLength: 0)
            }
        default:
            VStack(alignment: .leading, spacing: 7) {
                HStack {
                    Text("Today · most at risk").font(.headline)
                    Spacer()
                    if s.streak > 0 {
                        Label("\(s.streak)-day streak", systemImage: "flame.fill").font(.caption).foregroundStyle(.orange)
                    }
                }
                ForEach(risks(s).prefix(4), id: \.self) { r in Bar(label: r.n, value: r.v, p: r.p) }
                Spacer(minLength: 0)
            }
        }
    }

    /// The 4 targets least likely to be made. Falls back to the basics before the app has sent them.
    func risks(_ s: TodaySummary) -> [RiskItem] {
        if let r = s.risk, !r.isEmpty { return r }
        return [RiskItem(n: "Focus", v: "\(hrs(s.focusMin)) / \(hrs(s.focusGoal)) h", p: frac(s.focusMin, s.focusGoal)),
                RiskItem(n: "Steps", v: "\(s.steps) / \(s.stepsT)", p: frac(s.steps, s.stepsT)),
                RiskItem(n: "Water", v: "\(s.water) / \(s.waterT) ml", p: frac(s.water, s.waterT)),
                RiskItem(n: "Calories", v: "\(s.kcal) / \(s.kcalT)", p: frac(s.kcal, s.kcalT))].sorted { $0.p < $1.p }
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
        VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .center, spacing: 10) {
                Image(systemName: icon(ctx.attributes.kind))
                    .font(.title2.weight(.semibold)).foregroundStyle(accent)
                    .frame(width: 36, height: 36)
                    .background(accent.opacity(0.18), in: RoundedRectangle(cornerRadius: 10))
                VStack(alignment: .leading, spacing: 1) {
                    Text(st.title).font(.headline).lineLimit(1)
                    Text(st.subtitle.isEmpty ? st.info : st.subtitle).font(.caption).foregroundStyle(.secondary).lineLimit(1)
                }
                Spacer(minLength: 4)
                Text(timerInterval: st.start...st.end, countsDown: true)
                    .font(.system(size: 40, weight: .bold, design: .rounded).monospacedDigit())
                    .multilineTextAlignment(.trailing)
                    .frame(width: 128, alignment: .trailing)
            }
            ProgressView(timerInterval: st.start...st.end, countsDown: false) { EmptyView() } currentValueLabel: { EmptyView() }
                .tint(accent).scaleEffect(x: 1, y: 2.2, anchor: .center)
            HStack {
                if !st.next.isEmpty {
                    Label(st.next, systemImage: "arrow.right.circle.fill").font(.subheadline.weight(.medium)).lineLimit(1)
                }
                Spacer()
                Text("Ends \(st.end.formatted(date: .omitted, time: .shortened))").font(.caption).foregroundStyle(.secondary)
            }
            if !st.info.isEmpty && !st.subtitle.isEmpty {
                Text(st.info).font(.caption).foregroundStyle(.secondary).lineLimit(1)
            }
        }
        .padding(16)
        .activityBackgroundTint(Color.black.opacity(0.75))
        .activitySystemActionForegroundColor(.white)
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
                        if !ctx.state.next.isEmpty { Text(ctx.state.next).font(.caption).foregroundStyle(.secondary).lineLimit(1) }
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

// MARK: - Calendar

struct CalEntry: TimelineEntry {
    let date: Date
    let events: [CalEvent]
}

struct CalProvider: TimelineProvider {
    static var sample: [CalEvent] {
        let n = Date()
        return [CalEvent(t: "Gym: Push", s: n.addingTimeInterval(3600), e: n.addingTimeInterval(10800), h: 8, l: true, r: "plan"),
                CalEvent(t: "Dinner", s: n.addingTimeInterval(11000), e: n.addingTimeInterval(14000), h: 130, l: true, r: "plan")]
    }
    func upcoming(_ at: Date) -> [CalEvent] { (TodaySummary.load()?.events ?? []).filter { $0.e > at } }
    func placeholder(in context: Context) -> CalEntry { CalEntry(date: .now, events: Self.sample) }
    func getSnapshot(in context: Context, completion: @escaping (CalEntry) -> Void) {
        let u = upcoming(.now); completion(CalEntry(date: .now, events: u.isEmpty ? Self.sample : u))
    }
    func getTimeline(in context: Context, completion: @escaping (Timeline<CalEntry>) -> Void) {
        let all = TodaySummary.load()?.events ?? []
        var dates: [Date] = [.now] + all.map(\.e).filter { $0 > .now }.prefix(10)
        dates = Array(Set(dates)).sorted()
        let entries = dates.map { d in CalEntry(date: d, events: all.filter { $0.e > d }) }
        completion(Timeline(entries: entries, policy: .after(.now.addingTimeInterval(3600))))
    }
}

private func evURL(_ e: CalEvent) -> URL {
    var c = URLComponents(); c.scheme = "lifeos"; c.host = "open"; c.queryItems = [URLQueryItem(name: "h", value: e.r)]
    return c.url ?? URL(string: "lifeos://plan")!
}
private func hue(_ e: CalEvent) -> Color { Color(hue: e.h / 360, saturation: 0.6, brightness: 0.85) }
private func tm(_ d: Date) -> String { d.formatted(date: .omitted, time: .shortened) }

struct CalRow: View {
    let e: CalEvent
    var body: some View {
        Link(destination: evURL(e)) {
            HStack(spacing: 8) {
                RoundedRectangle(cornerRadius: 2).fill(hue(e)).frame(width: 4)
                VStack(alignment: .leading, spacing: 1) {
                    Text(e.t).font(.caption.weight(.semibold)).lineLimit(1)
                    Text("\(tm(e.s)) – \(tm(e.e))").font(.caption2).foregroundStyle(.secondary)
                }
                Spacer(minLength: 0)
                if e.l { Image(systemName: "link").font(.caption2).foregroundStyle(.secondary) }
            }
            .padding(.vertical, 4).padding(.horizontal, 6)
            .background(hue(e).opacity(0.14), in: RoundedRectangle(cornerRadius: 6))
        }
    }
}

struct CalView: View {
    @Environment(\.widgetFamily) var family
    let entry: CalEntry
    var body: some View {
        let evs = entry.events
        switch family {
        case .accessoryRectangular:
            if let e = evs.first {
                VStack(alignment: .leading, spacing: 1) {
                    Text(e.t).font(.headline).lineLimit(1)
                    Text("\(tm(e.s)) – \(tm(e.e))").font(.caption)
                    if evs.count > 1 { Text("Then \(evs[1].t)").font(.caption2).foregroundStyle(.secondary).lineLimit(1) }
                }
            } else { Text("No more events today") }
        case .systemSmall:
            VStack(alignment: .leading, spacing: 4) {
                Text(entry.date.formatted(.dateTime.weekday(.abbreviated).day())).font(.caption.weight(.bold)).foregroundStyle(.red)
                if evs.isEmpty { Text("Nothing planned").font(.caption).foregroundStyle(.secondary) }
                ForEach(evs.prefix(3), id: \.self) { e in
                    Link(destination: evURL(e)) {
                        HStack(spacing: 5) {
                            RoundedRectangle(cornerRadius: 1.5).fill(hue(e)).frame(width: 3)
                            VStack(alignment: .leading, spacing: 0) {
                                Text(e.t).font(.system(size: 11, weight: .semibold)).lineLimit(1)
                                Text(tm(e.s)).font(.system(size: 10)).foregroundStyle(.secondary)
                            }
                            Spacer(minLength: 0)
                        }
                        .padding(.vertical, 2).padding(.horizontal, 4)
                        .background(hue(e).opacity(0.14), in: RoundedRectangle(cornerRadius: 5))
                    }
                }
                Spacer(minLength: 0)
            }
        default:
            let n = family == .systemLarge ? 7 : 3
            VStack(alignment: .leading, spacing: 5) {
                HStack {
                    Text(entry.date.formatted(.dateTime.weekday(.wide).day().month())).font(.subheadline.weight(.bold))
                    Spacer()
                    Text("Life OS").font(.caption2).foregroundStyle(.secondary)
                }
                if evs.isEmpty { Text(TodaySummary.load()?.events == nil ? "Open Life OS once to load your calendar" : "Nothing else planned today or tomorrow").font(.caption).foregroundStyle(.secondary) }
                ForEach(evs.prefix(n), id: \.self) { CalRow(e: $0) }
                Spacer(minLength: 0)
            }
        }
    }
}

struct CalendarWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "Calendar", provider: CalProvider()) { entry in
            CalView(entry: entry)
                .containerBackground(.fill.tertiary, for: .widget)
                .widgetURL(URL(string: "lifeos://plan"))
        }
        .configurationDisplayName("Calendar")
        .description("Your next events. Tap one to open what it is linked to.")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge, .accessoryRectangular])
    }
}

@main
struct LifeOSWidgets: WidgetBundle {
    var body: some Widget {
        TodayWidget()
        CalendarWidget()
        FlightWidget()
        LifeOSLive()
    }
}

import Foundation
import HealthKit

/// Reads step counts from Apple Health (read only) and hands them to the web app.
final class Health {
    static let shared = Health()
    private let store = HKHealthStore()
    private var observer: HKObserverQuery?
    private var push: (([String: Int]) -> Void)?

    func start(push: @escaping ([String: Int]) -> Void) {
        self.push = push
        guard HKHealthStore.isHealthDataAvailable() else { return }
        let steps = HKQuantityType(.stepCount)
        store.requestAuthorization(toShare: [], read: [steps]) { ok, _ in
            guard ok else { return }
            self.fetch()
            if self.observer == nil {
                let q = HKObserverQuery(sampleType: steps, predicate: nil) { _, done, _ in
                    self.fetch()
                    done()
                }
                self.observer = q
                self.store.execute(q)
            }
        }
    }

    /// Daily totals for the last 7 days, keyed "yyyy-MM-dd".
    func fetch() {
        guard HKHealthStore.isHealthDataAvailable(), let push else { return }
        let cal = Calendar.current
        let end = Date()
        let today = cal.startOfDay(for: end)
        guard let start = cal.date(byAdding: .day, value: -6, to: today) else { return }
        let q = HKStatisticsCollectionQuery(
            quantityType: HKQuantityType(.stepCount),
            quantitySamplePredicate: HKQuery.predicateForSamples(withStart: start, end: end),
            options: .cumulativeSum, anchorDate: today, intervalComponents: DateComponents(day: 1))
        q.initialResultsHandler = { _, results, _ in
            let f = DateFormatter()
            f.locale = Locale(identifier: "en_US_POSIX")
            f.dateFormat = "yyyy-MM-dd"
            var out: [String: Int] = [:]
            results?.enumerateStatistics(from: start, to: end) { st, _ in
                out[f.string(from: st.startDate)] = Int(st.sumQuantity()?.doubleValue(for: .count()) ?? 0)
            }
            DispatchQueue.main.async { push(out) }
        }
        store.execute(q)
    }
}

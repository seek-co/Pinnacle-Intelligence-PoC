import { RATIOS } from '../data/mock'
import { Badge, Card, CardBody, PageHeader, StatCard } from '../components/ui'

export function CreditAnalysisPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Credit analysis"
        description="DSCR, LTV, leverage, liquidity, and global cash flow for the active loan file."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RATIOS.map((r) => (
          <StatCard
            key={r.label}
            label={r.label}
            value={r.value}
            sub={`Benchmark: ${r.benchmark}`}
            tone={r.status === 'pass' ? 'good' : 'warn'}
          />
        ))}
      </div>

      <Card>
        <CardBody>
          <h2 className="text-sm font-semibold">Ratio detail</h2>
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-zinc-500">
                <th className="pb-2">Metric</th>
                <th className="pb-2">Actual</th>
                <th className="pb-2">Benchmark</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {RATIOS.map((r) => (
                <tr key={r.label} className="border-t border-white/10">
                  <td className="py-3 font-medium">{r.label}</td>
                  <td className="py-3">{r.value}</td>
                  <td className="py-3 text-zinc-400">{r.benchmark}</td>
                  <td className="py-3">
                    <Badge tone={r.status === 'pass' ? 'good' : 'warn'}>
                      {r.status === 'pass' ? 'Pass' : 'Watch'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h2 className="text-sm font-semibold">Trend narrative</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Revenue increased 10% year-over-year with stable gross margins. Deposit analysis tracks reported revenue within 2.4%.
            Global cash flow of $525k supports proposed debt service with DSCR of 1.42x after normalization.
          </p>
        </CardBody>
      </Card>
    </div>
  )
}

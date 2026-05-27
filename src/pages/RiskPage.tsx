import { CONDITIONS, RISK_DRIVERS } from '../data/mock'
import { useApplications } from '../context/ApplicationsContext'
import { Badge, Card, CardBody, PageHeader, StatCard } from '../components/ui'

export function RiskPage() {
  const { activeApplication: loan } = useApplications()

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Risk & decision"
        description="Recommended risk grade, credit decision, conditions, and covenants."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Risk grade" value={loan.riskGrade} />
        <StatCard label="Recommendation" value="Approve w/ conditions" tone="good" />
        <StatCard label="Proposed DSCR" value="1.42x" tone="good" />
      </div>

      <Card>
        <CardBody>
          <h2 className="text-sm font-semibold">Risk drivers</h2>
          <ul className="mt-4 space-y-2">
            {RISK_DRIVERS.map((d) => (
              <li key={d.driver} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm">
                <span>{d.driver}</span>
                <Badge tone={d.impact === 'positive' ? 'good' : 'warn'}>
                  {d.impact === 'positive' ? 'Positive' : 'Risk'}
                </Badge>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h2 className="text-sm font-semibold">Conditions precedent</h2>
          <ul className="mt-3 list-inside list-decimal space-y-2 text-sm text-zinc-300">
            {CONDITIONS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="mt-6 flex gap-2">
            <button type="button" className="rounded-xl bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-200 ring-1 ring-emerald-400/30">
              Approve with conditions
            </button>
            <button type="button" className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300">
              Counteroffer
            </button>
            <button type="button" className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300">
              Decline
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

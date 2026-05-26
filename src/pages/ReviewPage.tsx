import { REVIEW_ITEMS } from '../data/mock'
import { Card, CardBody, PageHeader } from '../components/ui'

export function ReviewPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Human review"
        description="Overrides, corrections, and supervisor approvals — every change is recorded in the audit trail."
      />

      <Card>
        <CardBody className="space-y-4">
          {REVIEW_ITEMS.map((item, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">{item.type}</span>
                <span className="text-xs text-zinc-500">{item.when} • {item.user}</span>
              </div>
              <div className="mt-2 text-sm font-semibold">{item.item}</div>
              <div className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
                <div className="rounded-lg bg-black/30 px-3 py-2">
                  <span className="text-xs text-zinc-500">Original</span>
                  <div className="text-zinc-400 line-through">{item.original}</div>
                </div>
                <div className="rounded-lg bg-cyan-400/10 px-3 py-2 ring-1 ring-cyan-400/20">
                  <span className="text-xs text-zinc-500">Corrected</span>
                  <div className="text-cyan-100">{item.corrected}</div>
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h2 className="text-sm font-semibold">Pending supervisor action</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Policy exception on leverage target awaits final sign-off. Memo draft is ready for supervisor review.
          </p>
          <button type="button" className="mt-4 rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950">
            Route to supervisor
          </button>
        </CardBody>
      </Card>
    </div>
  )
}

import { AUDIT_LOG } from '../data/mock'
import { Card, CardBody, PageHeader } from '../components/ui'

export function AuditPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Audit log"
        description="Immutable activity record for documents, agents, overrides, and approvals."
        actions={
          <button type="button" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
            Export audit package
          </button>
        }
      />

      <Card>
        <CardBody className="p-0">
          <ul className="divide-y divide-white/10">
            {AUDIT_LOG.map((entry, i) => (
              <li key={i} className="px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
                  <span>{entry.at}</span>
                  <span className="font-medium text-zinc-300">{entry.actor}</span>
                </div>
                <div className="mt-1 text-sm font-semibold">{entry.action}</div>
                <div className="mt-0.5 text-sm text-zinc-400">{entry.detail}</div>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { useApplications } from '../context/ApplicationsContext'
import { Badge, Button, Card, CardBody, InfoField, PageHeader } from '../components/ui'
import { WorkflowTimeline } from '../components/WorkflowTimeline'

export function IntakePage() {
  const { activeApplication: loan } = useApplications()

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Loan intake"
        description="Borrower and request details extracted from imported documents. Review and save before underwriting."
        actions={
          <>
            {!loan.underwritingComplete && (
              <Link to="/applications/new">
                <Button variant="secondary">Import more documents</Button>
              </Link>
            )}
            <Button variant="primary">Save</Button>
          </>
        }
      />
      <WorkflowTimeline />

      <Card>
        <CardBody className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-zinc-300">Borrower & request</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Legal entity name" value={loan.borrower} />
              <Field label="Industry / NAICS" value={loan.industry} />
              <Field label="Location" value={loan.location} />
              <Field label="SBA program" value={loan.program} />
              <Field
                label="Requested amount"
                value={
                  loan.requested
                    ? `$${loan.requested.toLocaleString()}`
                    : 'Pending extraction'
                }
              />
              <Field label="Use of proceeds" value={loan.purpose} />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-zinc-300">Ownership & guarantors</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Ownership structure" value={loan.owners} />
              <Field label="Principal 1" value={loan.principal1 ?? '—'} />
              <Field label="Principal 2" value={loan.principal2 ?? '—'} />
              <Field label="Personal guarantee" value="Per SBA Form 413" />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-zinc-300">Assignment</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <InfoField label="Loan originator" value={loan.assignee} />
              <InfoField label="Supervisor" value={loan.supervisor} />
              <InfoField label="File opened" value={loan.created} />
              <InfoField label="Target close" value={loan.targetClose} />
              <div className="flex items-end sm:col-span-2">
                <Badge tone="info">{loan.stageLabel}</Badge>
              </div>
            </div>
          </div>

          {loan.documents.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-zinc-300">Imported documents</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-zinc-400">
                {loan.documents.map((d) => (
                  <li key={d.id} className="flex justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span className="truncate font-medium text-zinc-200">{d.name}</span>
                    <span className="shrink-0 text-xs">{d.kind}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-xs text-zinc-500">{label}</span>
      <input
        readOnly
        value={value}
        className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-cyan-400/40"
      />
    </label>
  )
}

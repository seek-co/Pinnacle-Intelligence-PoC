import { ACTIVE_LOAN } from '../data/mock'
import { Badge, Button, Card, CardBody, InfoField, PageHeader } from '../components/ui'
import { WorkflowTimeline } from '../components/WorkflowTimeline'

export function IntakePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Loan intake"
        description="Create and edit loan file metadata, borrower details, and assignment."
        actions={<Button variant="primary">Save</Button>}
      />
      <WorkflowTimeline />

      <Card>
        <CardBody className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-zinc-300">Borrower & request</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Legal entity name" value={ACTIVE_LOAN.borrower} />
              <Field label="Industry / NAICS" value={ACTIVE_LOAN.industry} />
              <Field label="Location" value={ACTIVE_LOAN.location} />
              <Field label="SBA program" value={ACTIVE_LOAN.program} />
              <Field label="Requested amount" value={`$${ACTIVE_LOAN.requested.toLocaleString()}`} />
              <Field label="Use of proceeds" value={ACTIVE_LOAN.purpose} />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-zinc-300">Ownership & guarantors</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Ownership structure" value={ACTIVE_LOAN.owners} />
              <Field label="Principal 1" value="Elena Vasquez — 60%" />
              <Field label="Principal 2" value="Marcus Chen — 40%" />
              <Field label="Personal guarantee" value="Both principals" />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-zinc-300">Assignment</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <InfoField label="Loan originator" value={ACTIVE_LOAN.assignee} />
              <InfoField label="Supervisor" value={ACTIVE_LOAN.supervisor} />
              <InfoField label="Target close" value={ACTIVE_LOAN.targetClose} />
              <div className="flex items-end">
                <Badge tone="info">{ACTIVE_LOAN.stageLabel}</Badge>
              </div>
            </div>
          </div>
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

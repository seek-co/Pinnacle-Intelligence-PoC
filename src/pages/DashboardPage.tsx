import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ACTIVE_LOAN, PIPELINE } from '../data/mock'
import { Badge, Card, CardBody, PageHeader, StatCard } from '../components/ui'
import { WorkflowTimeline } from '../components/WorkflowTimeline'

export function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Pipeline"
        description="Monitor loan files across intake, underwriting, and approval stages."
        actions={
          <Link
            to="/documents"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950"
          >
            Upload documents <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <WorkflowTimeline />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active files" value="24" sub="Across all stages" />
        <StatCard label="Avg turnaround" value="36h" sub="Last 30 days" tone="good" />
        <StatCard label="In policy review" value="6" />
        <StatCard label="Pending supervisor" value="3" tone="warn" />
      </div>

      <Card>
        <CardBody>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Featured file — {ACTIVE_LOAN.id}</h2>
            <Badge tone="info">{ACTIVE_LOAN.recommendation}</Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 text-sm">
            <div><span className="text-zinc-500">Borrower</span><div className="font-medium">{ACTIVE_LOAN.borrower}</div></div>
            <div><span className="text-zinc-500">Stage</span><div className="font-medium">{ACTIVE_LOAN.stageLabel}</div></div>
            <div><span className="text-zinc-500">Risk</span><div className="font-medium">{ACTIVE_LOAN.riskGrade}</div></div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-0">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-sm font-semibold">All loan files</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs text-zinc-500">
                  <th className="px-5 py-3 font-medium">File ID</th>
                  <th className="px-5 py-3 font-medium">Borrower</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Stage</th>
                  <th className="px-5 py-3 font-medium">Risk</th>
                  <th className="px-5 py-3 font-medium">Assignee</th>
                  <th className="px-5 py-3 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody>
                {PIPELINE.map((row) => (
                  <tr key={row.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-5 py-3 font-mono text-xs text-cyan-300/90">{row.id}</td>
                    <td className="px-5 py-3 font-medium">{row.borrower}</td>
                    <td className="px-5 py-3">{row.amount}</td>
                    <td className="px-5 py-3">{row.stage}</td>
                    <td className="px-5 py-3"><Badge tone={row.risk === 'Elevated' ? 'warn' : row.risk === 'Low' ? 'good' : 'neutral'}>{row.risk}</Badge></td>
                    <td className="px-5 py-3 text-zinc-400">{row.assignee}</td>
                    <td className="px-5 py-3 text-zinc-500">{row.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

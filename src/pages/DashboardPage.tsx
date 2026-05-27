import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Plus } from 'lucide-react'
import { useApplications } from '../context/ApplicationsContext'
import { Badge, Card, CardBody, PageHeader, StatCard } from '../components/ui'
import { WorkflowTimeline } from '../components/WorkflowTimeline'

export function DashboardPage() {
  const navigate = useNavigate()
  const { pipeline, activeApplication, setActiveId } = useApplications()

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Pipeline"
        description="Monitor loan files across intake, underwriting, and approval stages."
        actions={
          <>
            <Link
              to="/applications/new"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950"
            >
              <Plus className="h-4 w-4" />
              New application
            </Link>
            <Link
              to="/documents"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200"
            >
              Documents <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        }
      />

      <WorkflowTimeline />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active files" value={String(pipeline.length)} sub="In pipeline" />
        <StatCard label="Avg turnaround" value="36h" sub="Last 30 days" tone="good" />
        <StatCard label="In policy review" value="6" />
        <StatCard label="Pending supervisor" value="3" tone="warn" />
      </div>

      <Card>
        <CardBody>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Active file — {activeApplication.id}</h2>
            <Badge tone="info">{activeApplication.recommendation}</Badge>
          </div>
          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <span className="text-zinc-500">Borrower</span>
              <div className="font-medium">{activeApplication.borrower}</div>
            </div>
            <div>
              <span className="text-zinc-500">Stage</span>
              <div className="font-medium">{activeApplication.stageLabel}</div>
            </div>
            <div>
              <span className="text-zinc-500">Risk</span>
              <div className="font-medium">{activeApplication.riskGrade}</div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-0">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-sm font-semibold">All loan files</h2>
            <p className="mt-0.5 text-xs text-zinc-500">Select a row to open that application</p>
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
                {pipeline.map((row) => {
                  const isActive = row.id === activeApplication.id
                  return (
                    <tr
                      key={row.id}
                      onClick={() => {
                        setActiveId(row.id)
                        navigate('/intake')
                      }}
                      className={[
                        'cursor-pointer border-b border-white/5 transition',
                        isActive ? 'bg-cyan-400/10' : 'hover:bg-white/5',
                      ].join(' ')}
                    >
                      <td className="px-5 py-3 font-mono text-xs text-cyan-300/90">
                        {row.id}
                        {isActive && (
                          <span className="ml-2 text-[10px] uppercase text-cyan-400">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 font-medium">{row.borrower}</td>
                      <td className="px-5 py-3">{row.amount}</td>
                      <td className="px-5 py-3">{row.stage}</td>
                      <td className="px-5 py-3">
                        <Badge
                          tone={
                            row.risk === 'Elevated'
                              ? 'warn'
                              : row.risk === 'Low'
                                ? 'good'
                                : 'neutral'
                          }
                        >
                          {row.risk}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-zinc-400">{row.assignee}</td>
                      <td className="px-5 py-3 text-zinc-500">{row.updated}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

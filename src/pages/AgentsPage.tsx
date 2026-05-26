import { Link } from 'react-router-dom'
import { AGENT_RUNS } from '../data/mock'
import { Badge, Card, CardBody, PageHeader } from '../components/ui'

export function AgentsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Agent activity"
        description="Multi-agent underwriting run history, model versions, and execution status for the active loan file."
        actions={
          <Link
            to="/documents"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950"
          >
            Process documents
          </Link>
        }
      />

      <Card>
        <CardBody className="p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs text-zinc-500">
                <th className="px-5 py-3">Run ID</th>
                <th className="px-5 py-3">Agent</th>
                <th className="px-5 py-3">Version</th>
                <th className="px-5 py-3">Started</th>
                <th className="px-5 py-3">Duration</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {AGENT_RUNS.map((run) => (
                <tr key={run.id} className="border-b border-white/5">
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">{run.id}</td>
                  <td className="px-5 py-3 font-medium">{run.agent}</td>
                  <td className="px-5 py-3 text-zinc-400">{run.version}</td>
                  <td className="px-5 py-3 text-zinc-400">{run.started}</td>
                  <td className="px-5 py-3">{run.duration}</td>
                  <td className="px-5 py-3">
                    <Badge tone="good">Completed</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}

import { ADMIN_USERS, POLICY_CONFIG } from '../data/mock'
import { Badge, Card, CardBody, PageHeader } from '../components/ui'

export function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Administration"
        description="Users, roles, and versioned policy rule configuration for your institution."
      />

      <Card>
        <CardBody>
          <h2 className="text-sm font-semibold">Users & roles</h2>
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-zinc-500">
                <th className="pb-2">Name</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_USERS.map((u) => (
                <tr key={u.email} className="border-t border-white/10">
                  <td className="py-3 font-medium">{u.name}</td>
                  <td className="py-3">{u.role}</td>
                  <td className="py-3 text-zinc-400">{u.email}</td>
                  <td className="py-3"><Badge tone="good">{u.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h2 className="text-sm font-semibold">Policy rules (versioned)</h2>
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-zinc-500">
                <th className="pb-2">Rule</th>
                <th className="pb-2">Threshold</th>
                <th className="pb-2">Scope</th>
                <th className="pb-2">Version</th>
              </tr>
            </thead>
            <tbody>
              {POLICY_CONFIG.map((p) => (
                <tr key={p.name} className="border-t border-white/10">
                  <td className="py-3 font-medium">{p.name}</td>
                  <td className="py-3">{p.value}</td>
                  <td className="py-3 text-zinc-400">{p.scope}</td>
                  <td className="py-3 font-mono text-xs">{p.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}

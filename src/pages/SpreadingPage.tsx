import { SPREAD_BALANCE, SPREAD_INCOME } from '../data/mock'
import { Card, CardBody, PageHeader } from '../components/ui'

export function SpreadingPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Financial spreading"
        description="Standardized income statement, balance sheet, and normalized EBITDA with add-backs."
      />

      <SpreadTable title="Income statement (normalized)" headers={['Line item', '2024', '2023', 'Adjustments']} rows={SPREAD_INCOME} />
      <SpreadTable title="Balance sheet" headers={['Line item', '2024', '2023']} rows={SPREAD_BALANCE.map((r) => ({ line: r.line, y2024: r.y2024, y2023: r.y2023, adj: '—' }))} hideAdj />

      <Card>
        <CardBody>
          <h2 className="text-sm font-semibold">Add-back notes</h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-zinc-400">
            <li>Owner compensation normalized per lender policy (+$42,000)</li>
            <li>Depreciation add-back per tax return (+$38,000)</li>
            <li>No non-recurring items identified in submitted package</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}

function SpreadTable({
  title,
  headers,
  rows,
  hideAdj,
}: {
  title: string
  headers: string[]
  rows: { line: string; y2024: string; y2023: string; adj?: string }[]
  hideAdj?: boolean
}) {
  return (
    <Card>
      <CardBody className="p-0">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="text-sm font-semibold">{title}</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs text-zinc-500">
              {headers.map((h) => (
                <th key={h} className="px-5 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.line} className="border-b border-white/5">
                <td className="px-5 py-3 font-medium">{r.line}</td>
                <td className="px-5 py-3">{r.y2024}</td>
                <td className="px-5 py-3 text-zinc-400">{r.y2023}</td>
                {!hideAdj && <td className="px-5 py-3 text-cyan-200/80">{r.adj ?? '—'}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}

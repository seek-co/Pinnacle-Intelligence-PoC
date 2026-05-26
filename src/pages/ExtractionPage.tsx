import { EXTRACTED_FIELDS } from '../data/mock'
import { Badge, Card, CardBody, PageHeader } from '../components/ui'

export function ExtractionPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Extraction review"
        description="Review OCR fields, confidence scores, and source anchors before spreading."
        actions={
          <button type="button" className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950">
            Approve extraction
          </button>
        }
      />

      <Card>
        <CardBody className="p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs text-zinc-500">
                <th className="px-5 py-3">Field</th>
                <th className="px-5 py-3">Extracted value</th>
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Confidence</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {EXTRACTED_FIELDS.map((row) => (
                <tr key={row.field} className="border-b border-white/5">
                  <td className="px-5 py-3 font-medium">{row.field}</td>
                  <td className="px-5 py-3">{row.value}</td>
                  <td className="px-5 py-3 text-zinc-400">{row.source}</td>
                  <td className="px-5 py-3">
                    <Badge tone={row.confidence >= 0.95 ? 'good' : 'warn'}>
                      {(row.confidence * 100).toFixed(0)}%
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <button type="button" className="text-xs text-cyan-300 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <p className="text-xs text-zinc-500">
        Fields below the confidence threshold are flagged for human review before underwriting continues.
      </p>
    </div>
  )
}

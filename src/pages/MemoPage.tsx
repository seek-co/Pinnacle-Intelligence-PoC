import { MEMO_SECTIONS } from '../data/mock'
import { Button, Card, CardBody, PageHeader } from '../components/ui'

export function MemoPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Credit memo"
        description="AI-drafted credit memo with editable sections and source-grounded narrative."
        actions={
          <>
            <Button variant="secondary">Export PDF</Button>
            <Button variant="primary">Submit for approval</Button>
          </>
        }
      />

      <div className="space-y-4">
        {MEMO_SECTIONS.map((section) => (
          <Card key={section.title}>
            <CardBody>
              <h2 className="text-sm font-semibold text-cyan-200/90">{section.title}</h2>
              <textarea
                readOnly
                defaultValue={section.content}
                rows={Math.min(6, Math.max(3, Math.ceil(section.content.length / 80)))}
                className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm leading-relaxed text-zinc-300 outline-none"
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

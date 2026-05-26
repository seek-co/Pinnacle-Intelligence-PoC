import { POLICY_RULES } from '../data/mock'
import { Badge, Card, CardBody, PageHeader } from '../components/ui'

export function PolicyPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Policy review"
        description="SBA and lender checklist rules, pass/fail results, exceptions, and mitigants."
      />

      <Card>
        <CardBody className="space-y-3">
          {POLICY_RULES.map((rule) => (
            <div
              key={rule.rule}
              className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="text-sm font-semibold">{rule.rule}</div>
                <div className="mt-1 text-sm text-zinc-400">{rule.note}</div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Badge tone={rule.result === 'Pass' ? 'good' : 'warn'}>{rule.result}</Badge>
                <Badge tone={rule.severity === 'low' ? 'neutral' : 'warn'}>{rule.severity}</Badge>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  )
}

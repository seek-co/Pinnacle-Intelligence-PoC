import { WORKFLOW_STAGES } from '../data/mock'

export function WorkflowTimeline() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/4 p-4">
      <div className="flex min-w-max items-center gap-1">
        {WORKFLOW_STAGES.map((s, i) => (
          <div key={s.key} className="flex items-center">
            <div
              className={[
                'rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap',
                s.current
                  ? 'bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/30'
                  : s.done
                    ? 'bg-emerald-400/10 text-emerald-200/90'
                    : 'bg-white/5 text-zinc-500',
              ].join(' ')}
            >
              {s.label}
            </div>
            {i < WORKFLOW_STAGES.length - 1 && (
              <div className="mx-0.5 h-px w-3 bg-white/15" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

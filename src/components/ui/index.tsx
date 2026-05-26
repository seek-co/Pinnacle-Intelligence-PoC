import type { ReactNode } from 'react'

export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-b from-white/6 to-white/2 ${className}`}
    >
      {children}
    </div>
  )
}

export function CardBody({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`p-5 ${className}`}>{children}</div>
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-zinc-400">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'good' | 'warn' | 'bad' | 'info'
}) {
  const tones = {
    neutral: 'border-white/10 bg-white/5 text-zinc-300',
    good: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
    warn: 'border-amber-400/25 bg-amber-400/10 text-amber-200',
    bad: 'border-rose-400/25 bg-rose-400/10 text-rose-200',
    info: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function StatCard({
  label,
  value,
  sub,
  tone = 'neutral',
}: {
  label: string
  value: string
  sub?: string
  tone?: 'neutral' | 'good' | 'warn'
}) {
  const ring =
    tone === 'good'
      ? 'border-emerald-400/25 bg-emerald-400/10'
      : tone === 'warn'
        ? 'border-amber-400/25 bg-amber-400/10'
        : 'border-white/10 bg-white/5'
  return (
    <div className={`rounded-2xl border px-4 py-3 ${ring}`}>
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-lg font-semibold text-zinc-100">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-zinc-500">{sub}</div>}
    </div>
  )
}

export function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-zinc-100">{value}</div>
    </div>
  )
}

export function Button({
  children,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}) {
  const variants = {
    primary:
      'bg-zinc-100 text-zinc-950 hover:bg-white disabled:opacity-50',
    secondary:
      'border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10',
    ghost: 'text-zinc-300 hover:bg-white/5',
  }
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${variants[variant]} disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Table({
  headers,
  rows,
}: {
  headers: string[]
  rows: (string | ReactNode)[][]
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div
        className="grid gap-0 bg-white/6 px-4 py-2 text-xs font-medium text-zinc-300"
        style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
      >
        {headers.map((h) => (
          <div key={h}>{h}</div>
        ))}
      </div>
      <div className="divide-y divide-white/10">
        {rows.map((row, i) => (
          <div
            key={i}
            className="grid items-center gap-0 px-4 py-3 text-sm text-zinc-200"
            style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
          >
            {row.map((cell, j) => (
              <div key={j} className="min-w-0 pr-2">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function WorkflowBar() {
  return null
}

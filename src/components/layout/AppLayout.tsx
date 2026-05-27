import { NavLink, Outlet } from 'react-router-dom'
import { Menu, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useApplications } from '../../context/ApplicationsContext'
import { NAV_BY_SECTION } from './nav'
import { Badge } from '../ui'

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { activeApplication } = useApplications()
  const loan = activeApplication

  return (
    <div className="flex min-h-dvh bg-zinc-950 text-zinc-100">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-zinc-950 transition-transform lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/80 to-cyan-400/70">
            <Sparkles className="h-5 w-5 text-zinc-950" />
          </div>
          <div>
            <div className="text-sm font-semibold">Underwriting IQ</div>
            <div className="text-xs text-zinc-500">SBA Underwriting Platform</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {Object.entries(NAV_BY_SECTION).map(([section, items]) => (
            <div key={section} className="mb-5">
              <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                {section}
              </div>
              <ul className="space-y-0.5">
                {items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        [
                          'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition',
                          isActive
                            ? 'bg-white/10 font-medium text-zinc-100'
                            : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200',
                        ].join(' ')
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0 opacity-80" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4 text-xs text-zinc-500">
          Human-in-the-loop • Audit ready
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-white/10 bg-zinc-950/80 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              className="rounded-lg border border-white/10 p-2 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-cyan-300/90">{loan.id}</span>
                <Badge tone="info">{loan.stageLabel}</Badge>
              </div>
              <div className="mt-0.5 truncate text-sm font-semibold">{loan.borrower}</div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
              <span>{loan.program}</span>
              <span className="text-zinc-600">•</span>
              <span>
                {loan.requested
                  ? `$${(loan.requested / 1000).toFixed(0)}K`
                  : 'Amount TBD'}
              </span>
              <span className="text-zinc-600">•</span>
              <span>{loan.assignee}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

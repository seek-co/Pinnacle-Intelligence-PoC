import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  BrainCircuit,
  FileSpreadsheet,
  FileText,
  FolderUp,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useApplications } from '../../context/ApplicationsContext'
import { InfoField } from '../../components/ui'

type Stage =
  | 'idle'
  | 'ingesting'
  | 'classifying'
  | 'extracting'
  | 'agents'
  | 'spreads'

type UploadedFile = {
  id: string
  name: string
  sizeLabel: string
  kind: 'Tax Return' | 'P&L' | 'Bank Statements' | 'Debt Schedule' | 'SBA Forms'
}

type AgentId =
  | 'doc_intel'
  | 'entity_resolution'
  | 'spreading'
  | 'policy_rules'
  | 'risk_rating'
  | 'memo_draft'

type AgentState = 'queued' | 'running' | 'done'

const DEFAULT_FILES: UploadedFile[] = [
  { id: 'f1', name: '2024_Business_Tax_Return_1120S.pdf', sizeLabel: '2,184 KB', kind: 'Tax Return' },
  { id: 'f2', name: '2024_Year_End_P&L.xlsx', sizeLabel: '412 KB', kind: 'P&L' },
  { id: 'f3', name: 'Bank_Statements_Jan-Dec_2024.pdf', sizeLabel: '5,908 KB', kind: 'Bank Statements' },
  { id: 'f4', name: 'Debt_Schedule.pdf', sizeLabel: '188 KB', kind: 'Debt Schedule' },
  { id: 'f5', name: 'SBA_1919_and_413.pdf', sizeLabel: '642 KB', kind: 'SBA Forms' },
]

export function DocumentIntakePanel() {
  const { activeApplication } = useApplications()
  const [stage, setStage] = useState<Stage>('idle')
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [progress, setProgress] = useState(0)
  const [activeAgent, setActiveAgent] = useState<AgentId | null>(null)
  const [agentState, setAgentState] = useState<Record<AgentId, AgentState>>({
    doc_intel: 'queued',
    entity_resolution: 'queued',
    spreading: 'queued',
    policy_rules: 'queued',
    risk_rating: 'queued',
    memo_draft: 'queued',
  })

  const timersRef = useRef<number[]>([])
  const processing = useRef(false)

  const resetProcessing = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t))
    timersRef.current = []
    processing.current = false
    setStage('idle')
    setFiles([])
    setProgress(0)
    setActiveAgent(null)
    setAgentState({
      doc_intel: 'queued',
      entity_resolution: 'queued',
      spreading: 'queued',
      policy_rules: 'queued',
      risk_rating: 'queued',
      memo_draft: 'queued',
    })
  }

  useEffect(() => () => resetProcessing(), [])

  const staged = (fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms))
  }

  const startProcessing = (incoming?: File[]) => {
    if (processing.current) return
    processing.current = true

    const picked: UploadedFile[] =
      incoming?.length
        ? incoming.slice(0, 8).map((f, idx) => ({
            id: `${Date.now()}_${idx}_${f.name}`,
            name: f.name,
            sizeLabel: `${Math.max(1, Math.round(f.size / 1024))} KB`,
            kind:
              idx % 5 === 0 ? 'Tax Return' : idx % 5 === 1 ? 'P&L' : idx % 5 === 2 ? 'Bank Statements' : idx % 5 === 3 ? 'Debt Schedule' : 'SBA Forms',
          }))
        : DEFAULT_FILES

    setFiles(picked)
    setStage('ingesting')
    setProgress(6)
    staged(() => setProgress(16), 350)
    staged(() => setProgress(28), 900)
    staged(() => { setStage('classifying'); setProgress(34) }, 1200)
    staged(() => setProgress(46), 1800)
    staged(() => { setStage('extracting'); setProgress(55) }, 2400)
    staged(() => setProgress(63), 2800)
    staged(() => setProgress(72), 3300)
    staged(() => {
      setStage('agents')
      setProgress(78)
      setActiveAgent('doc_intel')
      setAgentState((s) => ({ ...s, doc_intel: 'running' }))
    }, 3800)

    const steps: Array<{ at: number; id: AgentId; donePrev?: AgentId }> = [
      { at: 5200, id: 'entity_resolution', donePrev: 'doc_intel' },
      { at: 6600, id: 'spreading', donePrev: 'entity_resolution' },
      { at: 8200, id: 'policy_rules', donePrev: 'spreading' },
      { at: 9900, id: 'risk_rating', donePrev: 'policy_rules' },
      { at: 11500, id: 'memo_draft', donePrev: 'risk_rating' },
    ]
    for (const step of steps) {
      staged(() => {
        setProgress((p) => Math.min(94, p + 4))
        if (step.donePrev) setAgentState((s) => ({ ...s, [step.donePrev!]: 'done' }))
        setActiveAgent(step.id)
        setAgentState((s) => ({ ...s, [step.id]: 'running' }))
      }, step.at)
    }
    staged(() => {
      setAgentState((s) => ({ ...s, memo_draft: 'done' }))
      setActiveAgent(null)
      setProgress(100)
      setStage('spreads')
    }, 13200)
  }

  const agents = useMemo(
    () => [
      { id: 'doc_intel' as const, label: 'Document Intelligence', icon: <ScanSearch className="h-4 w-4" />, blurb: 'Classifies files and anchors fields to sources.' },
      { id: 'entity_resolution' as const, label: 'Entity Resolution', icon: <BrainCircuit className="h-4 w-4" />, blurb: 'Normalizes borrower and owner identities.' },
      { id: 'spreading' as const, label: 'Financial Spreading', icon: <FileSpreadsheet className="h-4 w-4" />, blurb: 'Builds standardized spreads and ratios.' },
      { id: 'policy_rules' as const, label: 'Policy Rules', icon: <ShieldCheck className="h-4 w-4" />, blurb: 'Runs lender and SBA checklist rules.' },
      { id: 'risk_rating' as const, label: 'Risk Rating', icon: <Sparkles className="h-4 w-4" />, blurb: 'Synthesizes risk grade and decision.' },
      { id: 'memo_draft' as const, label: 'Credit Memo Draft', icon: <FileText className="h-4 w-4" />, blurb: 'Produces underwriter-ready memo draft.' },
    ],
    [],
  )

  const spread = {
    ratios: [
      { label: 'DSCR', value: '1.42x' },
      { label: 'LTV', value: '68%' },
      { label: 'Leverage', value: '3.1x' },
      { label: 'Liquidity', value: '4.1 mo' },
    ],
    rows: [
      { label: 'Revenue (TTM)', v1: '$2,910,000', v2: '$2,840,000', note: 'Deposits corroborate.' },
      { label: 'EBITDA', v1: '$418,000', v2: '—', note: 'Add-backs normalized.' },
      { label: 'Global cash flow', v1: '$525,000', v2: '—', note: 'Guarantors included.' },
    ],
  }

  const stageLabel =
    stage === 'idle' ? 'Awaiting documents' : stage === 'ingesting' ? 'Secure upload' : stage === 'classifying' ? 'Classification' : stage === 'extracting' ? 'OCR + extraction' : stage === 'agents' ? 'Underwriting analysis' : 'Processing complete'

  return (
    <div className="grid grid-cols-12 gap-6">
      <section className="col-span-12 xl:col-span-5">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); if (stage === 'idle') startProcessing(Array.from(e.dataTransfer.files)) }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/6 to-white/2 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">Upload & process</div>
              <div className="mt-1 text-sm text-zinc-400">Drag loan documents or upload from your device.</div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => startProcessing()} disabled={stage !== 'idle'} className="rounded-xl bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-950 disabled:opacity-50">
                Process package
              </button>
              <button type="button" onClick={resetProcessing} className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5">
                Clear
              </button>
            </div>
          </div>

          <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-white/15 bg-black/20 p-4 text-sm text-zinc-400 hover:border-white/25">
            <input type="file" multiple className="hidden" disabled={stage !== 'idle'} onChange={(e) => startProcessing(Array.from(e.target.files ?? []))} />
            <FolderUp className="h-4 w-4" />
            <span>Click to browse or drop files in this panel</span>
          </label>

          <div className="mt-4 space-y-2">
            {(files.length ? files : stage === 'idle' ? [] : DEFAULT_FILES).map((f) => (
              <div key={f.id} className="flex justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
                <div className="min-w-0 truncate font-medium">{f.name}</div>
                <div className="shrink-0 text-xs text-zinc-500">{f.kind}</div>
              </div>
            ))}
            {files.length === 0 && stage === 'idle' && (
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-zinc-400">
                <ArrowRight className="h-4 w-4" />
                Drop files to begin intake and underwriting
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>{stageLabel}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <InfoField label="Borrower" value={activeApplication.borrower} />
          <InfoField
            label="Request"
            value={
              activeApplication.requested
                ? `$${(activeApplication.requested / 1000).toFixed(0)}K ${activeApplication.program}`
                : activeApplication.program
            }
          />
        </div>
      </section>

      <section className="col-span-12 xl:col-span-7 space-y-4">
        <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
          <div className="text-sm font-semibold">Agent activity</div>
          <div className="mt-3 space-y-2">
            {agents.map((a) => (
              <div key={a.id} className={`flex gap-3 rounded-xl border px-3 py-2 ${activeAgent === a.id ? 'border-cyan-400/30 bg-cyan-400/10' : 'border-white/10 bg-white/5'}`}>
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-black/30">{a.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm font-medium">{a.label}<StatePill state={agentState[a.id]} /></div>
                  <div className="text-xs text-zinc-500">{a.blurb}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {stage === 'spreads' && (
          <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
            <div className="text-sm font-semibold">Spread preview</div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {spread.ratios.map((r) => (
                <div key={r.label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <div className="text-xs text-zinc-500">{r.label}</div>
                  <div className="font-semibold text-emerald-200">{r.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 divide-y divide-white/10 rounded-xl border border-white/10">
              {spread.rows.map((row) => (
                <div key={row.label} className="grid grid-cols-3 gap-2 px-3 py-2 text-sm">
                  <div className="font-medium">{row.label}</div>
                  <div>{row.v1}</div>
                  <div className="text-zinc-500">{row.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

function StatePill({ state }: { state: AgentState }) {
  if (state === 'running') return <span className="text-xs text-cyan-300">Running</span>
  if (state === 'done') return <span className="text-xs text-emerald-300">Complete</span>
  return <span className="text-xs text-zinc-500">Queued</span>
}

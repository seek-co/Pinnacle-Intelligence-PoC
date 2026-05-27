import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileUp, FolderOpen, Loader2, Package } from 'lucide-react'
import { DOCUMENT_PACKAGES } from '../data/documentPackages'
import { useApplications } from '../context/ApplicationsContext'
import type { LoanApplication } from '../types/application'
import { Badge, Button, Card, CardBody, PageHeader } from '../components/ui'

type Phase = 'select' | 'processing' | 'done'

export function NewApplicationPage() {
  const navigate = useNavigate()
  const { createFromPackage, createFromFiles } = useApplications()
  const [phase, setPhase] = useState<Phase>('select')
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Preparing intake…')
  const [createdId, setCreatedId] = useState<string | null>(null)
  const timersRef = useRef<number[]>([])
  const pendingAction = useRef<(() => LoanApplication) | null>(null)

  useEffect(() => () => timersRef.current.forEach((t) => window.clearTimeout(t)), [])

  const runProcessing = (action: () => LoanApplication) => {
    timersRef.current.forEach((t) => window.clearTimeout(t))
    timersRef.current = []
    pendingAction.current = action
    setPhase('processing')
    setProgress(8)
    setStatus('Uploading documents…')

    const steps: Array<{ ms: number; p: number; s: string }> = [
      { ms: 400, p: 22, s: 'Scanning pages…' },
      { ms: 900, p: 38, s: 'Classifying document types…' },
      { ms: 1500, p: 52, s: 'Extracting borrower entity…' },
      { ms: 2100, p: 68, s: 'Matching SBA checklist…' },
      { ms: 2800, p: 84, s: 'Creating loan file…' },
      { ms: 3400, p: 100, s: 'Application ready' },
    ]

    for (const step of steps) {
      timersRef.current.push(
        window.setTimeout(() => {
          setProgress(step.p)
          setStatus(step.s)
        }, step.ms),
      )
    }

    timersRef.current.push(
      window.setTimeout(() => {
        const app = pendingAction.current!()
        setCreatedId(app.id)
        setPhase('done')
        timersRef.current.push(
          window.setTimeout(() => navigate('/intake'), 1200),
        )
      }, 3600),
    )
  }

  const onPackage = (packageId: string) => {
    runProcessing(() => createFromPackage(packageId))
  }

  const onFiles = (files: File[]) => {
    if (!files.length) return
    runProcessing(() => createFromFiles(files))
  }

  if (phase === 'processing' || phase === 'done') {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center py-20 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-400/30">
          {phase === 'done' ? (
            <Package className="h-8 w-8 text-cyan-300" />
          ) : (
            <Loader2 className="h-8 w-8 animate-spin text-cyan-300" />
          )}
        </div>
        <h2 className="mt-6 text-xl font-semibold">
          {phase === 'done' ? 'Loan file created' : 'Importing documents'}
        </h2>
        <p className="mt-2 text-sm text-zinc-400">{status}</p>
        {createdId && (
          <p className="mt-1 font-mono text-xs text-cyan-300/90">{createdId}</p>
        )}
        <div className="mt-8 w-full">
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-zinc-500">{progress}%</p>
        </div>
        {phase === 'done' && (
          <p className="mt-4 text-sm text-zinc-400">Opening loan intake…</p>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHeader
        title="New application"
        description="Import a document package to open a loan file. Borrower details are extracted from tax returns, SBA forms, and financial statements."
      />

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          onFiles(Array.from(e.dataTransfer.files))
        }}
        className="rounded-2xl border border-dashed border-white/20 bg-white/4 p-8 text-center transition hover:border-cyan-400/40 hover:bg-white/6"
      >
        <FileUp className="mx-auto h-10 w-10 text-zinc-400" />
        <h2 className="mt-4 text-lg font-semibold">Import your documents</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
          Drag and drop PDFs, spreadsheets, or images. The system will classify files,
          extract the borrower, and create a new loan application.
        </p>
        <label className="mt-6 inline-block cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => onFiles(Array.from(e.target.files ?? []))}
          />
          <span className="inline-flex items-center gap-2 rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950">
            <FolderOpen className="h-4 w-4" />
            Browse files
          </span>
        </label>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-zinc-300">Or import a sample package</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Pre-built document sets for common SBA scenarios — useful for training and walkthroughs.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {DOCUMENT_PACKAGES.map((pkg) => (
            <Card key={pkg.id} className="transition hover:border-cyan-400/25">
              <CardBody>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{pkg.label}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{pkg.description}</p>
                  </div>
                  <Badge tone="neutral">{pkg.documents.length} files</Badge>
                </div>
                <p className="mt-3 text-xs text-zinc-500">
                  {pkg.loan.borrower} • {pkg.industry}
                </p>
                <Button
                  variant="secondary"
                  className="mt-4 w-full"
                  onClick={() => onPackage(pkg.id)}
                >
                  Import package
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

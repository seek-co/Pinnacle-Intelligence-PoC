import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { LoanApplication, PipelineRow } from '../types/application'
import {
  buildApplicationFromPackage,
  buildApplicationFromUploadedFiles,
  DOCUMENT_PACKAGES,
} from '../data/documentPackages'
import {
  ACTIVE_LOAN,
  CLASSIFIED_DOCS,
  DOCUMENT_CHECKLIST,
  PIPELINE,
} from '../data/mock'

function formatAmount(n: number) {
  if (!n) return 'TBD'
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  return `$${Math.round(n / 1000)}K`
}

function toPipelineRow(app: LoanApplication): PipelineRow {
  return {
    id: app.id,
    borrower: app.borrower,
    amount: formatAmount(app.requested),
    stage: app.stageLabel,
    risk:
      app.riskGrade.includes('Pending') || app.riskGrade.includes('In ')
        ? 'Moderate'
        : app.riskGrade.includes('Elevated')
          ? 'Elevated'
          : app.riskGrade.includes('Low')
            ? 'Low'
            : 'Moderate',
    assignee: app.assignee,
    updated: app.updated,
  }
}

function seedRedwood(): LoanApplication {
  return {
    id: ACTIVE_LOAN.id,
    borrower: ACTIVE_LOAN.borrower,
    industry: ACTIVE_LOAN.industry,
    program: ACTIVE_LOAN.program,
    requested: ACTIVE_LOAN.requested,
    purpose: ACTIVE_LOAN.purpose,
    location: ACTIVE_LOAN.location,
    stage: ACTIVE_LOAN.stage,
    stageLabel: ACTIVE_LOAN.stageLabel,
    assignee: ACTIVE_LOAN.assignee,
    supervisor: ACTIVE_LOAN.supervisor,
    created: ACTIVE_LOAN.created,
    targetClose: ACTIVE_LOAN.targetClose,
    owners: ACTIVE_LOAN.owners,
    riskGrade: ACTIVE_LOAN.riskGrade,
    recommendation: ACTIVE_LOAN.recommendation,
    updated: '2h ago',
    documents: [
      { id: 'f1', name: '2024_Business_Tax_Return_1120S.pdf', sizeLabel: '2,184 KB', kind: 'Tax Return' },
      { id: 'f2', name: '2024_Year_End_P&L.xlsx', sizeLabel: '412 KB', kind: 'P&L' },
      { id: 'f3', name: 'Bank_Statements_Jan-Dec_2024.pdf', sizeLabel: '5,908 KB', kind: 'Bank Statements' },
      { id: 'f4', name: 'Debt_Schedule.pdf', sizeLabel: '188 KB', kind: 'Debt Schedule' },
      { id: 'f5', name: 'SBA_1919_and_413.pdf', sizeLabel: '642 KB', kind: 'SBA Forms' },
    ],
    checklist: DOCUMENT_CHECKLIST,
    classifiedDocs: CLASSIFIED_DOCS,
    principal1: 'Elena Vasquez — 60%',
    principal2: 'Marcus Chen — 40%',
    underwritingComplete: true,
  }
}

function seedStub(row: (typeof PIPELINE)[0]): LoanApplication {
  const pkg = DOCUMENT_PACKAGES.find((p) => p.loan.borrower === row.borrower)
  if (pkg) {
    const app = buildApplicationFromPackage(pkg, row.id, '2026-05-01')
    return {
      ...app,
      stageLabel: row.stage,
      updated: row.updated,
      underwritingComplete: row.id === ACTIVE_LOAN.id,
    }
  }
  return {
    id: row.id,
    borrower: row.borrower,
    industry: '—',
    program: 'SBA 7(a)',
    requested: parseInt(row.amount.replace(/\D/g, ''), 10) * (row.amount.includes('M') ? 1000 : 1) * 1000 || 500_000,
    purpose: '—',
    location: '—',
    stage: 'in_progress',
    stageLabel: row.stage,
    assignee: row.assignee,
    supervisor: 'Morgan Patel',
    created: '2026-05-01',
    targetClose: '—',
    owners: '—',
    riskGrade: row.risk,
    recommendation: 'In review',
    updated: row.updated,
    documents: [],
    checklist: [],
    classifiedDocs: [],
    underwritingComplete: false,
  }
}

function buildInitialApplications(): LoanApplication[] {
  const map = new Map<string, LoanApplication>()
  map.set(ACTIVE_LOAN.id, seedRedwood())
  for (const row of PIPELINE) {
    if (!map.has(row.id)) map.set(row.id, seedStub(row))
  }
  return Array.from(map.values())
}

type ApplicationsContextValue = {
  applications: LoanApplication[]
  pipeline: PipelineRow[]
  activeApplication: LoanApplication
  activeId: string
  setActiveId: (id: string) => void
  createFromPackage: (packageId: string) => LoanApplication
  createFromFiles: (files: File[]) => LoanApplication
  nextLoanId: () => string
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null)

let idCounter = 150

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<LoanApplication[]>(buildInitialApplications)
  const [activeId, setActiveId] = useState(ACTIVE_LOAN.id)

  const nextLoanId = useCallback(() => {
    idCounter += 1
    return `LN-2026-${String(idCounter).padStart(4, '0')}`
  }, [])

  const activeApplication = useMemo(
    () => applications.find((a) => a.id === activeId) ?? applications[0]!,
    [applications, activeId],
  )

  const pipeline = useMemo(
    () =>
      [...applications]
        .map(toPipelineRow)
        .sort((a, b) => (a.updated === 'Just now' ? -1 : b.updated === 'Just now' ? 1 : 0)),
    [applications],
  )

  const createFromPackage = useCallback(
    (packageId: string) => {
      const pkg = DOCUMENT_PACKAGES.find((p) => p.id === packageId)
      if (!pkg) throw new Error('Unknown package')
      const id = nextLoanId()
      const created = new Date().toISOString().slice(0, 10)
      const app = buildApplicationFromPackage(pkg, id, created)
      setApplications((prev) => [app, ...prev])
      setActiveId(id)
      return app
    },
    [nextLoanId],
  )

  const createFromFiles = useCallback(
    (files: File[]) => {
      const id = nextLoanId()
      const created = new Date().toISOString().slice(0, 10)
      const app = buildApplicationFromUploadedFiles(files, id, created)
      setApplications((prev) => [app, ...prev])
      setActiveId(id)
      return app
    },
    [nextLoanId],
  )

  const value = useMemo(
    () => ({
      applications,
      pipeline,
      activeApplication,
      activeId,
      setActiveId,
      createFromPackage,
      createFromFiles,
      nextLoanId,
    }),
    [
      applications,
      pipeline,
      activeApplication,
      activeId,
      createFromPackage,
      createFromFiles,
      nextLoanId,
    ],
  )

  return (
    <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>
  )
}

export function useApplications() {
  const ctx = useContext(ApplicationsContext)
  if (!ctx) throw new Error('useApplications must be used within ApplicationsProvider')
  return ctx
}

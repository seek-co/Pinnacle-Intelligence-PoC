import type { ApplicationDocument, LoanApplication } from '../types/application'

export type DocumentPackage = {
  id: string
  label: string
  description: string
  industry: string
  documents: ApplicationDocument[]
  loan: Omit<
    LoanApplication,
    'id' | 'created' | 'updated' | 'documents' | 'checklist' | 'classifiedDocs' | 'underwritingComplete'
  >
}

function checklistFromDocs(docs: ApplicationDocument[]) {
  const has = (kind: ApplicationDocument['kind']) => docs.some((d) => d.kind === kind)
  const docName = (kind: ApplicationDocument['kind']) =>
    docs.find((d) => d.kind === kind)?.name ?? null

  return [
    {
      item: 'Business tax return (most recent)',
      required: true,
      status: has('Tax Return') ? ('received' as const) : ('pending' as const),
      doc: docName('Tax Return'),
    },
    {
      item: 'Year-end P&L',
      required: true,
      status: has('P&L') ? ('received' as const) : ('pending' as const),
      doc: docName('P&L'),
    },
    {
      item: 'Bank statements (12 months)',
      required: true,
      status: has('Bank Statements') ? ('received' as const) : ('pending' as const),
      doc: docName('Bank Statements'),
    },
    {
      item: 'Debt schedule',
      required: true,
      status: has('Debt Schedule') ? ('received' as const) : ('pending' as const),
      doc: docName('Debt Schedule'),
    },
    {
      item: 'SBA Form 1919',
      required: true,
      status: has('SBA Forms') ? ('received' as const) : ('pending' as const),
      doc: docName('SBA Forms'),
    },
    {
      item: 'Interim financials',
      required: true,
      status: 'pending' as const,
      doc: null,
    },
  ]
}

function classifiedFromDocs(docs: ApplicationDocument[]) {
  return docs.map((d) => ({
    name: d.name,
    type: d.kind,
    pages: d.kind === 'Bank Statements' ? 48 : d.kind === 'Tax Return' ? 24 : 4,
    confidence: 0.94 + Math.random() * 0.05,
    status: 'Extracted',
  }))
}

export function buildApplicationFromPackage(
  pkg: DocumentPackage,
  newId: string,
  created: string,
): LoanApplication {
  return {
    id: newId,
    ...pkg.loan,
    created,
    updated: 'Just now',
    documents: pkg.documents,
    checklist: checklistFromDocs(pkg.documents),
    classifiedDocs: classifiedFromDocs(pkg.documents),
    underwritingComplete: false,
  }
}

export const DOCUMENT_PACKAGES: DocumentPackage[] = [
  {
    id: 'food-manufacturing',
    label: 'Food manufacturing — full package',
    description: 'SBA 7(a) acquisition with tax return, P&L, bank statements, and SBA forms.',
    industry: 'Food Manufacturing',
    documents: [
      { id: 'd1', name: '2024_Business_Tax_Return_1120S.pdf', sizeLabel: '2,184 KB', kind: 'Tax Return' },
      { id: 'd2', name: '2024_Year_End_P&L.xlsx', sizeLabel: '412 KB', kind: 'P&L' },
      { id: 'd3', name: 'Bank_Statements_Jan-Dec_2024.pdf', sizeLabel: '5,908 KB', kind: 'Bank Statements' },
      { id: 'd4', name: 'Debt_Schedule.pdf', sizeLabel: '188 KB', kind: 'Debt Schedule' },
      { id: 'd5', name: 'SBA_1919_and_413.pdf', sizeLabel: '642 KB', kind: 'SBA Forms' },
      { id: 'd6', name: 'Guarantor_PFS_2024.pdf', sizeLabel: '96 KB', kind: 'Personal Financial' },
    ],
    loan: {
      borrower: 'Redwood Artisan Foods, LLC',
      industry: 'Food Manufacturing',
      program: 'SBA 7(a)',
      requested: 850_000,
      purpose: 'Equipment + working capital',
      location: 'Tacoma, WA',
      stage: 'documents_received',
      stageLabel: 'Documents received',
      assignee: 'Jordan Lee',
      supervisor: 'Morgan Patel',
      targetClose: '2026-07-15',
      owners: '2 principals (100% combined)',
      riskGrade: 'Pending analysis',
      recommendation: 'In underwriting',
      principal1: 'Elena Vasquez — 60%',
      principal2: 'Marcus Chen — 40%',
    },
  },
  {
    id: 'marine-supply',
    label: 'Marine supply — expansion',
    description: 'Inventory and warehouse expansion with 3-year financial history.',
    industry: 'Wholesale Trade',
    documents: [
      { id: 'd1', name: 'Cascade_Marine_1120_2024.pdf', sizeLabel: '1,890 KB', kind: 'Tax Return' },
      { id: 'd2', name: 'Cascade_Marine_P&L_2024.xlsx', sizeLabel: '328 KB', kind: 'P&L' },
      { id: 'd3', name: 'Business_Bank_Statements_2024.pdf', sizeLabel: '4,210 KB', kind: 'Bank Statements' },
      { id: 'd4', name: 'Equipment_Debt_Schedule.pdf', sizeLabel: '142 KB', kind: 'Debt Schedule' },
      { id: 'd5', name: 'SBA_Form_1919_Cascade.pdf', sizeLabel: '520 KB', kind: 'SBA Forms' },
    ],
    loan: {
      borrower: 'Cascade Marine Supply Co.',
      industry: 'Wholesale Trade',
      program: 'SBA 7(a)',
      requested: 1_200_000,
      purpose: 'Inventory + warehouse expansion',
      location: 'Bellingham, WA',
      stage: 'documents_received',
      stageLabel: 'Documents received',
      assignee: 'Sam Rivera',
      supervisor: 'Morgan Patel',
      targetClose: '2026-08-01',
      owners: '3 members (100% combined)',
      riskGrade: 'Pending analysis',
      recommendation: 'In underwriting',
      principal1: 'James Okonkwo — 45%',
      principal2: 'Sarah Lindstrom — 35%',
    },
  },
  {
    id: 'dental-practice',
    label: 'Dental practice — acquisition',
    description: 'Practice acquisition with guarantor PFS and debt schedule.',
    industry: 'Healthcare',
    documents: [
      { id: 'd1', name: 'Northstar_Dental_Tax_Return_2024.pdf', sizeLabel: '1,654 KB', kind: 'Tax Return' },
      { id: 'd2', name: 'Practice_P&L_2024.pdf', sizeLabel: '256 KB', kind: 'P&L' },
      { id: 'd3', name: 'Operating_Account_Statements.pdf', sizeLabel: '2,880 KB', kind: 'Bank Statements' },
      { id: 'd4', name: 'Practice_Debt_Schedule.pdf', sizeLabel: '98 KB', kind: 'Debt Schedule' },
      { id: 'd5', name: 'SBA_413_Guarantor.pdf', sizeLabel: '410 KB', kind: 'SBA Forms' },
      { id: 'd6', name: 'Dr_Patel_PFS.pdf', sizeLabel: '88 KB', kind: 'Personal Financial' },
    ],
    loan: {
      borrower: 'Northstar Dental Group PLLC',
      industry: 'Healthcare',
      program: 'SBA 7(a)',
      requested: 620_000,
      purpose: 'Practice acquisition',
      location: 'Spokane, WA',
      stage: 'documents_received',
      stageLabel: 'Documents received',
      assignee: 'Jordan Lee',
      supervisor: 'Morgan Patel',
      targetClose: '2026-07-22',
      owners: '2 partners (100%)',
      riskGrade: 'Pending analysis',
      recommendation: 'In underwriting',
      principal1: 'Dr. Anika Patel — 70%',
      principal2: 'Dr. Ryan Cho — 30%',
    },
  },
  {
    id: 'logistics',
    label: 'Logistics — fleet & working capital',
    description: 'Fleet upgrade package with bank statements and UCC collateral list.',
    industry: 'Transportation',
    documents: [
      { id: 'd1', name: 'Evergreen_Logistics_1120S_2024.pdf', sizeLabel: '2,420 KB', kind: 'Tax Return' },
      { id: 'd2', name: 'Evergreen_P&L_2024.xlsx', sizeLabel: '390 KB', kind: 'P&L' },
      { id: 'd3', name: 'Fleet_Bank_Statements_12mo.pdf', sizeLabel: '6,120 KB', kind: 'Bank Statements' },
      { id: 'd4', name: 'Vehicle_Debt_Schedule.pdf', sizeLabel: '210 KB', kind: 'Debt Schedule' },
      { id: 'd5', name: 'SBA_1919_Evergreen.pdf', sizeLabel: '598 KB', kind: 'SBA Forms' },
    ],
    loan: {
      borrower: 'Evergreen Logistics LLC',
      industry: 'Transportation',
      program: 'SBA 7(a)',
      requested: 975_000,
      purpose: 'Fleet upgrade + working capital',
      location: 'Portland, OR',
      stage: 'documents_received',
      stageLabel: 'Documents received',
      assignee: 'Alex Kim',
      supervisor: 'Morgan Patel',
      targetClose: '2026-08-10',
      owners: 'Single member LLC',
      riskGrade: 'Pending analysis',
      recommendation: 'In underwriting',
      principal1: 'David Nguyen — 100%',
    },
  },
]

export function inferPackageFromFiles(files: File[]): DocumentPackage | null {
  const names = files.map((f) => f.name.toLowerCase()).join(' ')
  if (names.includes('cascade') || names.includes('marine')) {
    return DOCUMENT_PACKAGES.find((p) => p.id === 'marine-supply') ?? null
  }
  if (names.includes('dental') || names.includes('northstar')) {
    return DOCUMENT_PACKAGES.find((p) => p.id === 'dental-practice') ?? null
  }
  if (names.includes('evergreen') || names.includes('logistics')) {
    return DOCUMENT_PACKAGES.find((p) => p.id === 'logistics') ?? null
  }
  if (names.includes('redwood') || names.includes('artisan')) {
    return DOCUMENT_PACKAGES.find((p) => p.id === 'food-manufacturing') ?? null
  }
  return null
}

export function buildApplicationFromUploadedFiles(
  files: File[],
  newId: string,
  created: string,
): LoanApplication {
  const matched = inferPackageFromFiles(files)
  if (matched) {
    const docs: ApplicationDocument[] = files.slice(0, 12).map((f, i) => ({
      id: `up_${i}_${Date.now()}`,
      name: f.name,
      sizeLabel: `${Math.max(1, Math.round(f.size / 1024))} KB`,
      kind:
        i % 5 === 0
          ? 'Tax Return'
          : i % 5 === 1
            ? 'P&L'
            : i % 5 === 2
              ? 'Bank Statements'
              : i % 5 === 3
                ? 'Debt Schedule'
                : 'SBA Forms',
    }))
    const base = buildApplicationFromPackage(matched, newId, created)
    return { ...base, documents: docs.length ? docs : base.documents }
  }

  const docs: ApplicationDocument[] = files.map((f, i) => ({
    id: `up_${i}_${Date.now()}`,
    name: f.name,
    sizeLabel: `${Math.max(1, Math.round(f.size / 1024))} KB`,
    kind: 'Other',
  }))

  const borrowerGuess =
    files[0]?.name.replace(/\.[^.]+$/, '').replace(/_/g, ' ').slice(0, 48) ||
    'New Borrower Application'

  return {
    id: newId,
    borrower: borrowerGuess,
    industry: 'Pending classification',
    program: 'SBA 7(a)',
    requested: 0,
    purpose: 'To be confirmed from SBA Form 1919',
    location: 'Pending',
    stage: 'documents_received',
    stageLabel: 'Documents received',
    assignee: 'Jordan Lee',
    supervisor: 'Morgan Patel',
    created,
    targetClose: '—',
    owners: 'Pending extraction',
    riskGrade: 'Pending analysis',
    recommendation: 'In underwriting',
    updated: 'Just now',
    documents: docs,
    checklist: checklistFromDocs(docs),
    classifiedDocs: classifiedFromDocs(docs),
    underwritingComplete: false,
  }
}

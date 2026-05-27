export type DocumentKind =
  | 'Tax Return'
  | 'P&L'
  | 'Bank Statements'
  | 'Debt Schedule'
  | 'SBA Forms'
  | 'Personal Financial'
  | 'Other'

export type ApplicationDocument = {
  id: string
  name: string
  sizeLabel: string
  kind: DocumentKind
}

export type ChecklistItem = {
  item: string
  required: boolean
  status: 'received' | 'pending'
  doc: string | null
}

export type ClassifiedDocument = {
  name: string
  type: string
  pages: number
  confidence: number
  status: string
}

export type LoanApplication = {
  id: string
  borrower: string
  industry: string
  program: string
  requested: number
  purpose: string
  location: string
  stage: string
  stageLabel: string
  assignee: string
  supervisor: string
  created: string
  targetClose: string
  owners: string
  riskGrade: string
  recommendation: string
  updated: string
  documents: ApplicationDocument[]
  checklist: ChecklistItem[]
  classifiedDocs: ClassifiedDocument[]
  principal1?: string
  principal2?: string
  /** Full spreads/ratios available after underwriting run */
  underwritingComplete: boolean
}

export type PipelineRow = {
  id: string
  borrower: string
  amount: string
  stage: string
  risk: string
  assignee: string
  updated: string
}

export const ACTIVE_LOAN = {
  id: 'LN-2026-0142',
  borrower: 'Redwood Artisan Foods, LLC',
  industry: 'Food Manufacturing',
  program: 'SBA 7(a)',
  requested: 850_000,
  purpose: 'Equipment + working capital',
  location: 'Tacoma, WA',
  stage: 'memo_draft_ready',
  stageLabel: 'Memo draft ready',
  assignee: 'Jordan Lee',
  supervisor: 'Morgan Patel',
  created: '2026-05-12',
  targetClose: '2026-06-18',
  owners: '2 principals (100% combined)',
  riskGrade: 'Moderate (B+)',
  recommendation: 'Approve with conditions',
}

export const PIPELINE = [
  { id: 'LN-2026-0142', borrower: 'Redwood Artisan Foods, LLC', amount: '$850K', stage: 'Memo draft ready', risk: 'Moderate', assignee: 'Jordan Lee', updated: '2h ago' },
  { id: 'LN-2026-0138', borrower: 'Cascade Marine Supply Co.', amount: '$1.2M', stage: 'Policy review', risk: 'Elevated', assignee: 'Sam Rivera', updated: '5h ago' },
  { id: 'LN-2026-0131', borrower: 'Northstar Dental Group PLLC', amount: '$620K', stage: 'Financial spreading', risk: 'Low', assignee: 'Jordan Lee', updated: '1d ago' },
  { id: 'LN-2026-0124', borrower: 'Evergreen Logistics LLC', amount: '$975K', stage: 'Extraction review', risk: 'Moderate', assignee: 'Alex Kim', updated: '1d ago' },
  { id: 'LN-2026-0119', borrower: 'Summit Pet Care Inc.', amount: '$440K', stage: 'Documents received', risk: 'Low', assignee: 'Sam Rivera', updated: '2d ago' },
  { id: 'LN-2026-0102', borrower: 'Blue Harbor Café Group', amount: '$310K', stage: 'Supervisor review', risk: 'Moderate', assignee: 'Morgan Patel', updated: '3d ago' },
]

export const WORKFLOW_STAGES = [
  { key: 'draft', label: 'Draft', done: true },
  { key: 'submitted', label: 'Submitted', done: true },
  { key: 'documents', label: 'Documents received', done: true },
  { key: 'ocr', label: 'OCR processing', done: true },
  { key: 'extraction', label: 'Extraction review', done: true },
  { key: 'spreading', label: 'Financial spreading', done: true },
  { key: 'credit', label: 'Credit analysis', done: true },
  { key: 'policy', label: 'Policy review', done: true },
  { key: 'risk', label: 'Risk rating', done: true },
  { key: 'memo', label: 'Memo draft ready', done: true, current: true },
  { key: 'supervisor', label: 'Supervisor review', done: false },
  { key: 'approved', label: 'Approved', done: false },
]

export const DOCUMENT_CHECKLIST = [
  { item: 'Business tax return (most recent)', required: true, status: 'received' as const, doc: '2024_Business_Tax_Return_1120S.pdf' },
  { item: 'Year-end P&L', required: true, status: 'received' as const, doc: '2024_Year_End_P&L.xlsx' },
  { item: 'Bank statements (12 months)', required: true, status: 'received' as const, doc: 'Bank_Statements_Jan-Dec_2024.pdf' },
  { item: 'Debt schedule', required: true, status: 'received' as const, doc: 'Debt_Schedule.pdf' },
  { item: 'SBA Form 1919', required: true, status: 'received' as const, doc: 'SBA_1919_and_413.pdf' },
  { item: 'Personal financial statement (guarantor)', required: true, status: 'received' as const, doc: 'Guarantor_PFS_2024.pdf' },
  { item: 'Business debt schedule (SBA 2202)', required: false, status: 'received' as const, doc: 'SBA_2202.pdf' },
  { item: 'Interim financials (Q1 2026)', required: true, status: 'pending' as const, doc: null },
]

export const CLASSIFIED_DOCS = [
  { name: '2024_Business_Tax_Return_1120S.pdf', type: 'Tax Return', pages: 42, confidence: 0.97, status: 'Extracted' },
  { name: '2024_Year_End_P&L.xlsx', type: 'P&L', pages: 1, confidence: 0.99, status: 'Extracted' },
  { name: 'Bank_Statements_Jan-Dec_2024.pdf', type: 'Bank Statements', pages: 156, confidence: 0.94, status: 'Extracted' },
  { name: 'Debt_Schedule.pdf', type: 'Debt Schedule', pages: 3, confidence: 0.96, status: 'Extracted' },
  { name: 'SBA_1919_and_413.pdf', type: 'SBA Forms', pages: 8, confidence: 0.98, status: 'Extracted' },
  { name: 'Guarantor_PFS_2024.pdf', type: 'Personal Financial', pages: 4, confidence: 0.95, status: 'Extracted' },
]

export const EXTRACTED_FIELDS = [
  { field: 'Revenue (TTM)', value: '$2,910,000', source: 'P&L p.1', confidence: 0.98 },
  { field: 'Net income', value: '$312,400', source: 'Tax return p.3', confidence: 0.96 },
  { field: 'EBITDA (normalized)', value: '$418,000', source: 'Spread engine', confidence: 0.94 },
  { field: 'Total assets', value: '$1,840,000', source: 'Balance sheet', confidence: 0.97 },
  { field: 'Total liabilities', value: '$980,000', source: 'Balance sheet', confidence: 0.97 },
  { field: 'Average deposits (monthly)', value: '$236,667', source: 'Bank statements', confidence: 0.92 },
  { field: 'Existing debt service', value: '$186,000', source: 'Debt schedule', confidence: 0.99 },
  { field: 'Borrower legal name', value: 'Redwood Artisan Foods, LLC', source: 'SBA 1919', confidence: 0.99 },
]

export const SPREAD_INCOME = [
  { line: 'Revenue', y2024: '$2,910,000', y2023: '$2,640,000', adj: '—' },
  { line: 'COGS', y2024: '$1,900,350', y2023: '$1,752,000', adj: '—' },
  { line: 'Gross profit', y2024: '$1,009,650', y2023: '$888,000', adj: '—' },
  { line: 'Operating expenses', y2024: '$591,650', y2023: '$548,000', adj: '—' },
  { line: 'Owner compensation add-back', y2024: '—', y2023: '—', adj: '$42,000' },
  { line: 'Depreciation add-back', y2024: '—', y2023: '—', adj: '$38,000' },
  { line: 'Normalized EBITDA', y2024: '$418,000', y2023: '$352,000', adj: '$80,000' },
]

export const SPREAD_BALANCE = [
  { line: 'Cash & equivalents', y2024: '$186,000', y2023: '$142,000' },
  { line: 'Accounts receivable', y2024: '$312,000', y2023: '$278,000' },
  { line: 'Inventory', y2024: '$248,000', y2023: '$231,000' },
  { line: 'Total assets', y2024: '$1,840,000', y2023: '$1,620,000' },
  { line: 'Total liabilities', y2024: '$980,000', y2023: '$910,000' },
  { line: 'Net worth', y2024: '$860,000', y2023: '$710,000' },
]

export const RATIOS = [
  { label: 'DSCR', value: '1.42x', benchmark: '≥ 1.25x', status: 'pass' as const },
  { label: 'LTV', value: '68%', benchmark: '≤ 80%', status: 'pass' as const },
  { label: 'Leverage', value: '3.1x', benchmark: '≤ 3.5x', status: 'warn' as const },
  { label: 'Liquidity', value: '4.1 mo', benchmark: '≥ 3.0 mo', status: 'pass' as const },
  { label: 'Global DTI', value: '38%', benchmark: '≤ 45%', status: 'pass' as const },
  { label: 'Debt / EBITDA', value: '2.3x', benchmark: '≤ 4.0x', status: 'pass' as const },
]

export const POLICY_RULES = [
  { rule: 'SBA eligibility — small business', result: 'Pass', severity: 'low' as const, note: 'Meets size standard for NAICS 311' },
  { rule: 'Minimum DSCR (1.25x)', result: 'Pass', severity: 'low' as const, note: 'Actual 1.42x' },
  { rule: 'Maximum LTV (80%)', result: 'Pass', severity: 'low' as const, note: 'Actual 68%' },
  { rule: 'Leverage target (≤ 3.0x internal)', result: 'Exception', severity: 'medium' as const, note: 'Actual 3.1x — mitigant: strong deposit trend' },
  { rule: 'Document package completeness', result: 'Pass', severity: 'low' as const, note: '1 pending item: interim financials' },
  { rule: 'Guarantor liquidity', result: 'Pass', severity: 'low' as const, note: 'PFS supports global cash flow' },
]

export const AGENT_RUNS = [
  { id: 'run-0142-a1', agent: 'Document Intelligence', version: 'v0.4.2', started: '2026-05-20 09:14', duration: '42s', status: 'completed' as const },
  { id: 'run-0142-a2', agent: 'Entity Resolution', version: 'v0.3.1', started: '2026-05-20 09:15', duration: '18s', status: 'completed' as const },
  { id: 'run-0142-a3', agent: 'Financial Spreading', version: 'v0.5.0', started: '2026-05-20 09:16', duration: '55s', status: 'completed' as const },
  { id: 'run-0142-a4', agent: 'Policy Rules', version: 'v0.2.8', started: '2026-05-20 09:17', duration: '12s', status: 'completed' as const },
  { id: 'run-0142-a5', agent: 'Risk Rating', version: 'v0.3.4', started: '2026-05-20 09:18', duration: '24s', status: 'completed' as const },
  { id: 'run-0142-a6', agent: 'Credit Memo Draft', version: 'v0.6.1', started: '2026-05-20 09:19', duration: '1m 08s', status: 'completed' as const },
]

export const RISK_DRIVERS = [
  { driver: 'Revenue growth (+10% YoY)', impact: 'positive' as const },
  { driver: 'Stable gross margin (34.7%)', impact: 'positive' as const },
  { driver: 'Leverage slightly above internal target', impact: 'negative' as const },
  { driver: 'Strong deposit corroboration', impact: 'positive' as const },
  { driver: 'Pending interim financials', impact: 'negative' as const },
]

export const CONDITIONS = [
  'Updated Q1 2026 interim financial statements prior to closing',
  'UCC-1 filing on equipment collateral',
  'Minimum DSCR covenant of 1.20x tested annually',
  'Personal guarantee from both principals',
]

export const REVIEW_ITEMS = [
  { type: 'Field correction', item: 'Average monthly deposits', original: '$228,400', corrected: '$236,667', user: 'Jordan Lee', when: '2026-05-20' },
  { type: 'Spread adjustment', item: 'Owner compensation add-back', original: '$35,000', corrected: '$42,000', user: 'Jordan Lee', when: '2026-05-20' },
  { type: 'Policy exception', item: 'Leverage target', original: 'Fail', corrected: 'Approved exception', user: 'Morgan Patel', when: '2026-05-21' },
]

export const MEMO_SECTIONS = [
  { title: 'Executive summary', content: 'Redwood Artisan Foods requests an $850,000 SBA 7(a) loan for equipment and working capital. The business demonstrates stable revenue growth, normalized EBITDA of $418k, and a projected DSCR of 1.42x including proposed debt.' },
  { title: 'Borrower overview', content: 'Established food manufacturing business in Tacoma, WA with two principal owners. Primary products are artisan packaged foods distributed regionally.' },
  { title: 'Repayment analysis', content: 'Repayment is supported by operating cash flow and guarantor global cash flow of $525k. Bank deposit analysis corroborates reported revenue within 2.4%.' },
  { title: 'Collateral', content: 'Equipment and business assets with estimated LTV of 68%. UCC filing required at closing.' },
  { title: 'Strengths', content: 'Revenue growth, stable margins, strong deposit trend, experienced management, complete primary document package.' },
  { title: 'Weaknesses / risks', content: 'Leverage slightly above internal target; pending interim financials. Mitigated by cash conversion and guarantor support.' },
  { title: 'Recommendation', content: 'Approve with conditions as listed. Risk grade: Moderate (B+).' },
]

export const AUDIT_LOG = [
  { at: '2026-05-21 14:02', actor: 'Morgan Patel', action: 'Approved policy exception', detail: 'Leverage target — mitigant documented' },
  { at: '2026-05-20 11:45', actor: 'Jordan Lee', action: 'Edited credit memo', detail: 'Repayment analysis section updated' },
  { at: '2026-05-20 09:19', actor: 'System', action: 'Agent run completed', detail: 'Credit Memo Draft v0.6.1' },
  { at: '2026-05-20 09:14', actor: 'Jordan Lee', action: 'Uploaded documents', detail: '5 files — loan package intake' },
  { at: '2026-05-12 16:30', actor: 'Jordan Lee', action: 'Created loan file', detail: 'LN-2026-0142' },
]

export const ADMIN_USERS = [
  { name: 'Jordan Lee', role: 'Loan Originator', email: 'jordan.lee@pinnaclecu.org', status: 'Active' },
  { name: 'Morgan Patel', role: 'Supervisor', email: 'morgan.patel@pinnaclecu.org', status: 'Active' },
  { name: 'Alex Kim', role: 'Loan Originator', email: 'alex.kim@pinnaclecu.org', status: 'Active' },
  { name: 'Admin User', role: 'Admin', email: 'admin@pinnaclecu.org', status: 'Active' },
]

export const POLICY_CONFIG = [
  { name: 'Minimum DSCR', value: '1.25x', scope: 'SBA 7(a)', version: '2026.1' },
  { name: 'Maximum LTV', value: '80%', scope: 'All commercial', version: '2026.1' },
  { name: 'Internal leverage target', value: '3.0x', scope: 'Credit union', version: '2026.1' },
  { name: 'Liquidity minimum', value: '3.0 months', scope: 'All commercial', version: '2026.1' },
]

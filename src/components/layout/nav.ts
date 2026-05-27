import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  ClipboardCheck,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Gauge,
  LayoutDashboard,
  ScanSearch,
  Settings,
  Shield,
  Sparkles,
  UserCheck,
  FilePlus2,
  Plus,
} from 'lucide-react'

export type NavItem = {
  label: string
  path: string
  icon: LucideIcon
  section?: string
}

export const NAV: NavItem[] = [
  { label: 'Pipeline', path: '/', icon: LayoutDashboard, section: 'Workflow' },
  { label: 'New application', path: '/applications/new', icon: Plus, section: 'Workflow' },
  { label: 'Loan intake', path: '/intake', icon: FilePlus2, section: 'Workflow' },
  { label: 'Documents', path: '/documents', icon: FolderOpen, section: 'Underwriting' },
  { label: 'Extraction review', path: '/extraction', icon: ScanSearch, section: 'Underwriting' },
  { label: 'Financial spreading', path: '/spreading', icon: FileSpreadsheet, section: 'Underwriting' },
  { label: 'Credit analysis', path: '/credit-analysis', icon: Gauge, section: 'Underwriting' },
  { label: 'Policy review', path: '/policy', icon: Shield, section: 'Underwriting' },
  { label: 'Agent activity', path: '/agents', icon: Activity, section: 'AI' },
  { label: 'Risk & decision', path: '/risk', icon: Sparkles, section: 'Decision' },
  { label: 'Human review', path: '/review', icon: UserCheck, section: 'Decision' },
  { label: 'Credit memo', path: '/memo', icon: FileText, section: 'Decision' },
  { label: 'Audit log', path: '/audit', icon: ClipboardCheck, section: 'Compliance' },
  { label: 'Administration', path: '/admin', icon: Settings, section: 'Admin' },
]

export const NAV_BY_SECTION = NAV.reduce<Record<string, NavItem[]>>((acc, item) => {
  const s = item.section ?? 'Other'
  if (!acc[s]) acc[s] = []
  acc[s].push(item)
  return acc
}, {})

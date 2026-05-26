import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { IntakePage } from './pages/IntakePage'
import { DocumentsPage } from './pages/DocumentsPage'
import { ExtractionPage } from './pages/ExtractionPage'
import { SpreadingPage } from './pages/SpreadingPage'
import { CreditAnalysisPage } from './pages/CreditAnalysisPage'
import { PolicyPage } from './pages/PolicyPage'
import { AgentsPage } from './pages/AgentsPage'
import { RiskPage } from './pages/RiskPage'
import { ReviewPage } from './pages/ReviewPage'
import { MemoPage } from './pages/MemoPage'
import { AuditPage } from './pages/AuditPage'
import { AdminPage } from './pages/AdminPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="intake" element={<IntakePage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="extraction" element={<ExtractionPage />} />
          <Route path="spreading" element={<SpreadingPage />} />
          <Route path="credit-analysis" element={<CreditAnalysisPage />} />
          <Route path="policy" element={<PolicyPage />} />
          <Route path="agents" element={<AgentsPage />} />
          <Route path="risk" element={<RiskPage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="memo" element={<MemoPage />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

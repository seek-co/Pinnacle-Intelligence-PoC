import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useApplications } from '../context/ApplicationsContext'
import { Badge, Button, Card, CardBody, PageHeader } from '../components/ui'
import { DocumentIntakePanel } from '../features/documents/DocumentIntakePanel'

export function DocumentsPage() {
  const { activeApplication } = useApplications()
  const checklist = activeApplication.checklist
  const classified = activeApplication.classifiedDocs

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Documents"
        description="Secure upload, classification, and checklist for the active loan file."
        actions={
          <Link to="/applications/new">
            <Button variant="primary">
              <Plus className="h-4 w-4" />
              New application
            </Button>
          </Link>
        }
      />

      <DocumentIntakePanel />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h2 className="text-sm font-semibold">Document checklist</h2>
            {checklist.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">
                No checklist yet.{' '}
                <Link to="/applications/new" className="text-cyan-300 hover:underline">
                  Import documents
                </Link>{' '}
                to create an application.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {checklist.map((item) => (
                  <li
                    key={item.item}
                    className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  >
                    <div>
                      <div className="font-medium">{item.item}</div>
                      {item.doc && (
                        <div className="mt-0.5 text-xs text-zinc-500">{item.doc}</div>
                      )}
                    </div>
                    <Badge tone={item.status === 'received' ? 'good' : 'warn'}>
                      {item.status === 'received' ? 'Received' : 'Pending'}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-sm font-semibold">Classified documents</h2>
            {classified.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">
                Documents will appear here after intake and classification.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {classified.map((d) => (
                  <li
                    key={d.name}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  >
                    <div className="flex justify-between gap-2">
                      <span className="truncate font-medium">{d.name}</span>
                      <Badge tone="neutral">{d.type}</Badge>
                    </div>
                    <div className="mt-1 flex gap-3 text-xs text-zinc-500">
                      <span>{d.pages} pages</span>
                      <span>{(d.confidence * 100).toFixed(0)}% confidence</span>
                      <span className="text-emerald-400/90">{d.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'
import { formatDate, getStatusColor } from '@/lib/utils'

interface Document {
  id: string
  title: string
  document_number: string
  version: string
  document_type: string
  status: string
  effective_date?: string
  review_date?: string
  created_by: string
  approved_by?: string
  created_at: string
  updated_at: string
}

export default function DocumentsPage() {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  // Mock data for demonstration
  useEffect(() => {
    const mockDocuments: Document[] = [
      {
        id: '1',
        title: 'Standard Operating Procedure - Equipment Calibration',
        document_number: 'SOP-001',
        version: '2.1',
        document_type: 'SOP',
        status: 'effective',
        effective_date: '2024-01-15',
        review_date: '2025-01-15',
        created_by: 'user1',
        approved_by: 'user2',
        created_at: '2024-01-10T10:00:00Z',
        updated_at: '2024-01-15T14:30:00Z',
      },
      {
        id: '2',
        title: 'Quality Policy Manual',
        document_number: 'QPM-001',
        version: '1.0',
        document_type: 'Policy',
        status: 'pending_approval',
        effective_date: '2024-02-01',
        review_date: '2025-02-01',
        created_by: 'user1',
        created_at: '2024-01-20T09:00:00Z',
        updated_at: '2024-01-25T16:45:00Z',
      },
      {
        id: '3',
        title: 'Training Record Template',
        document_number: 'TRT-001',
        version: '1.2',
        document_type: 'Template',
        status: 'draft',
        created_by: 'user3',
        created_at: '2024-01-28T11:20:00Z',
        updated_at: '2024-01-30T13:15:00Z',
      },
    ]
    
    setTimeout(() => {
      setDocuments(mockDocuments)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.document_number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
    const matchesType = filterType === 'all' || doc.document_type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'effective':
        return <CheckCircle className="w-4 h-4 text-success-600" />
      case 'pending_approval':
        return <Clock className="w-4 h-4 text-warning-600" />
      case 'draft':
        return <Edit className="w-4 h-4 text-gray-600" />
      case 'superseded':
        return <XCircle className="w-4 h-4 text-gray-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      pending_review: { label: 'Pending Review', className: 'bg-yellow-100 text-yellow-800' },
      pending_approval: { label: 'Pending Approval', className: 'bg-orange-100 text-orange-800' },
      approved: { label: 'Approved', className: 'bg-blue-100 text-blue-800' },
      effective: { label: 'Effective', className: 'bg-green-100 text-green-800' },
      superseded: { label: 'Superseded', className: 'bg-gray-100 text-gray-600' },
      archived: { label: 'Archived', className: 'bg-gray-100 text-gray-500' },
    }
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.draft
    return (
      <Badge className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
            <p className="text-gray-600 mt-2">Manage controlled documents and procedures</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} variant="glass" className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600 mt-2">Manage controlled documents and procedures</p>
        </div>
        <Button asChild size="icon" className="gradient-primary shadow-colored hover-glow group">
          <Link href="/dashboard/documents/new" title="New Document">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          </Link>
        </Button>
      </div>

      {/* Filters and Search */}
      <Card variant="glass">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="pending_review">Pending Review</option>
                <option value="pending_approval">Pending Approval</option>
                <option value="effective">Effective</option>
                <option value="superseded">Superseded</option>
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Types</option>
                <option value="SOP">SOP</option>
                <option value="Policy">Policy</option>
                <option value="Template">Template</option>
                <option value="Form">Form</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <Card key={document.id} variant="glass" className="hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{document.document_number}</CardTitle>
                    <CardDescription className="text-sm">v{document.version}</CardDescription>
                  </div>
                </div>
                {getStatusIcon(document.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{document.title}</h3>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">{document.document_type}</Badge>
                  {getStatusBadge(document.status)}
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                {document.effective_date && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Effective: {formatDate(document.effective_date)}</span>
                  </div>
                )}
                {document.review_date && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Review: {formatDate(document.review_date)}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Created: {formatDate(document.created_at)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card variant="glass" className="text-center py-12">
          <CardContent>
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== 'all' || filterType !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first document'}
            </p>
            <Button asChild className="gradient-primary shadow-colored hover-glow">
              <Link href="/dashboard/documents/new">
                <Plus className="w-4 h-4 mr-2" />
                Create Document
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  GitBranch,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Target,
  TrendingUp,
  FileText,
} from 'lucide-react'
import Link from 'next/link'
import { formatDate, formatRelativeTime } from '@/lib/utils'

interface ChangeControl {
  id: string
  change_number: string
  title: string
  description: string
  change_type: string
  status: string
  priority: string
  requested_by: string
  approved_by?: string
  due_date?: string
  completed_date?: string
  created_at: string
  updated_at: string
}

export default function ChangeControlPage() {
  const { user } = useAuth()
  const [changes, setChanges] = useState<ChangeControl[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  // Mock data for demonstration
  useEffect(() => {
    const mockChanges: ChangeControl[] = [
      {
        id: '1',
        change_number: 'CR-2024-001',
        title: 'Update Cleaning Procedure for Lab B',
        description: 'Modify the cleaning procedure to include new disinfectant requirements',
        change_type: 'Process Change',
        status: 'pending_approval',
        priority: 'medium',
        requested_by: 'user1',
        due_date: '2024-02-20',
        created_at: '2024-01-25T10:00:00Z',
        updated_at: '2024-01-28T14:30:00Z',
      },
      {
        id: '2',
        change_number: 'CR-2024-002',
        title: 'Equipment Upgrade - Balance Replacement',
        description: 'Replace existing balance with new model requiring procedure updates',
        change_type: 'Equipment Change',
        status: 'approved',
        priority: 'high',
        requested_by: 'user3',
        approved_by: 'user4',
        due_date: '2024-02-15',
        created_at: '2024-01-20T09:00:00Z',
        updated_at: '2024-01-30T11:15:00Z',
      },
      {
        id: '3',
        change_number: 'CR-2024-003',
        title: 'Document Template Revision',
        description: 'Update batch record template to include new fields',
        change_type: 'Document Change',
        status: 'implemented',
        priority: 'low',
        requested_by: 'user5',
        approved_by: 'user6',
        due_date: '2024-01-30',
        completed_date: '2024-01-29',
        created_at: '2024-01-15T08:45:00Z',
        updated_at: '2024-01-29T16:20:00Z',
      },
    ]
    
    setTimeout(() => {
      setChanges(mockChanges)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredChanges = changes.filter(change => {
    const matchesSearch = change.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         change.change_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         change.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || change.status === filterStatus
    const matchesPriority = filterPriority === 'all' || change.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case 'high':
        return <TrendingUp className="w-4 h-4 text-orange-600" />
      case 'medium':
        return <Target className="w-4 h-4 text-yellow-600" />
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <Target className="w-4 h-4 text-gray-600" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      critical: { label: 'Critical', className: 'bg-red-100 text-red-800' },
      high: { label: 'High', className: 'bg-orange-100 text-orange-800' },
      medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      low: { label: 'Low', className: 'bg-green-100 text-green-800' },
    }
    
    const priorityInfo = priorityMap[priority as keyof typeof priorityMap] || priorityMap.medium
    return (
      <Badge className={priorityInfo.className}>
        {priorityInfo.label}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      pending_review: { label: 'Pending Review', className: 'bg-blue-100 text-blue-800' },
      pending_approval: { label: 'Pending Approval', className: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'Approved', className: 'bg-green-100 text-green-800' },
      implemented: { label: 'Implemented', className: 'bg-purple-100 text-purple-800' },
      closed: { label: 'Closed', className: 'bg-gray-100 text-gray-800' },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
    }
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.draft
    return (
      <Badge className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    )
  }

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'Process Change':
        return <GitBranch className="w-4 h-4 text-blue-600" />
      case 'Equipment Change':
        return <Target className="w-4 h-4 text-orange-600" />
      case 'Document Change':
        return <FileText className="w-4 h-4 text-green-600" />
      case 'System Change':
        return <TrendingUp className="w-4 h-4 text-purple-600" />
      default:
        return <GitBranch className="w-4 h-4 text-gray-600" />
    }
  }

  const getOverdueChanges = () => {
    const today = new Date()
    return changes.filter(change => {
      if (!change.due_date || change.status === 'closed' || change.status === 'cancelled') return false
      return new Date(change.due_date) < today
    }).length
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Change Control</h1>
            <p className="text-gray-600 mt-2">Manage and track change requests</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Change Control</h1>
          <p className="text-gray-600 mt-2">Manage and track change requests</p>
        </div>
        <Button asChild size="icon" className="gradient-secondary shadow-colored hover-glow group">
          <Link href="/dashboard/changes/new" title="New Change Request">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Changes</p>
                <p className="text-2xl font-bold text-gray-900">{changes.length}</p>
              </div>
              <GitBranch className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900">
                  {changes.filter(c => c.status === 'pending_approval').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{getOverdueChanges()}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Implemented</p>
                <p className="text-2xl font-bold text-green-600">
                  {changes.filter(c => c.status === 'implemented').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card variant="glass">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search change requests..."
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
                <option value="approved">Approved</option>
                <option value="implemented">Implemented</option>
                <option value="closed">Closed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Priority</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Changes List */}
      <div className="space-y-4">
        {filteredChanges.map((change) => (
          <Card key={change.id} variant="glass" className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getPriorityIcon(change.priority)}
                    <h3 className="text-lg font-semibold text-gray-900">{change.title}</h3>
                    <Badge variant="outline">{change.change_number}</Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{change.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      {getChangeTypeIcon(change.change_type)}
                      <span>{change.change_type}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Created: {formatDate(change.created_at)}</span>
                    </div>
                    {change.due_date && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Due: {formatDate(change.due_date)}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Requested by: {change.requested_by}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(change.priority)}
                    {getStatusBadge(change.status)}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChanges.length === 0 && (
        <Card variant="glass" className="text-center py-12">
          <CardContent>
            <GitBranch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No change requests found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first change request'}
            </p>
            <Button asChild className="gradient-secondary shadow-colored hover-glow">
              <Link href="/dashboard/changes/new">
                <Plus className="w-4 h-4 mr-2" />
                Create Change Request
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  ClipboardCheck,
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
} from 'lucide-react'
import Link from 'next/link'
import { formatDate, formatRelativeTime } from '@/lib/utils'

interface CAPA {
  id: string
  capa_number: string
  title: string
  description: string
  source_type: string
  source_id: string
  status: string
  priority: string
  assigned_to: string
  due_date?: string
  completed_date?: string
  created_by: string
  created_at: string
  updated_at: string
}

export default function CAPAPage() {
  const { user } = useAuth()
  const [capas, setCAPAs] = useState<CAPA[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  // Mock data for demonstration
  useEffect(() => {
    const mockCAPAs: CAPA[] = [
      {
        id: '1',
        capa_number: 'CAPA-2024-001',
        title: 'Improve Temperature Monitoring System',
        description: 'Implement automated temperature monitoring with alerts for Storage Room A',
        source_type: 'Quality Event',
        source_id: 'QE-2024-001',
        status: 'implementation',
        priority: 'high',
        assigned_to: 'user2',
        due_date: '2024-02-15',
        created_by: 'user1',
        created_at: '2024-01-20T10:00:00Z',
        updated_at: '2024-01-25T14:30:00Z',
      },
      {
        id: '2',
        capa_number: 'CAPA-2024-002',
        title: 'Enhanced Calibration Tracking',
        description: 'Develop systematic approach to equipment calibration scheduling and tracking',
        source_type: 'Quality Event',
        source_id: 'QE-2024-002',
        status: 'action_plan',
        priority: 'medium',
        assigned_to: 'user4',
        due_date: '2024-02-10',
        created_by: 'user3',
        created_at: '2024-01-15T09:00:00Z',
        updated_at: '2024-01-22T11:15:00Z',
      },
      {
        id: '3',
        capa_number: 'CAPA-2024-003',
        title: 'Documentation Review Process',
        description: 'Implement peer review process for batch manufacturing records',
        source_type: 'Quality Event',
        source_id: 'QE-2024-003',
        status: 'closed',
        priority: 'low',
        assigned_to: 'user6',
        due_date: '2024-01-25',
        completed_date: '2024-01-24',
        created_by: 'user5',
        created_at: '2024-01-10T08:45:00Z',
        updated_at: '2024-01-24T16:20:00Z',
      },
    ]
    
    setTimeout(() => {
      setCAPAs(mockCAPAs)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredCAPAs = capas.filter(capa => {
    const matchesSearch = capa.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         capa.capa_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         capa.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || capa.status === filterStatus
    const matchesPriority = filterPriority === 'all' || capa.priority === filterPriority
    
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
      investigation: { label: 'Investigation', className: 'bg-blue-100 text-blue-800' },
      action_plan: { label: 'Action Plan', className: 'bg-yellow-100 text-yellow-800' },
      implementation: { label: 'Implementation', className: 'bg-orange-100 text-orange-800' },
      effectiveness_check: { label: 'Effectiveness Check', className: 'bg-purple-100 text-purple-800' },
      closed: { label: 'Closed', className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Cancelled', className: 'bg-gray-100 text-gray-800' },
    }
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.draft
    return (
      <Badge className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    )
  }

  const getOverdueCAPAs = () => {
    const today = new Date()
    return capas.filter(capa => {
      if (!capa.due_date || capa.status === 'closed' || capa.status === 'cancelled') return false
      return new Date(capa.due_date) < today
    }).length
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CAPA Management</h1>
            <p className="text-gray-600 mt-2">Corrective and Preventive Actions</p>
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
          <h1 className="text-3xl font-bold text-gray-900">CAPA Management</h1>
          <p className="text-gray-600 mt-2">Corrective and Preventive Actions</p>
        </div>
        <Button asChild size="icon" className="gradient-success shadow-colored-success hover-glow-success group">
          <Link href="/dashboard/capa/new" title="New CAPA">
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
                <p className="text-sm font-medium text-gray-600">Total CAPAs</p>
                <p className="text-2xl font-bold text-gray-900">{capas.length}</p>
              </div>
              <ClipboardCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {capas.filter(c => ['investigation', 'action_plan', 'implementation'].includes(c.status)).length}
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
                <p className="text-2xl font-bold text-red-600">{getOverdueCAPAs()}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Closed</p>
                <p className="text-2xl font-bold text-green-600">
                  {capas.filter(c => c.status === 'closed').length}
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
                  placeholder="Search CAPAs..."
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
                <option value="investigation">Investigation</option>
                <option value="action_plan">Action Plan</option>
                <option value="implementation">Implementation</option>
                <option value="effectiveness_check">Effectiveness Check</option>
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

      {/* CAPAs List */}
      <div className="space-y-4">
        {filteredCAPAs.map((capa) => (
          <Card key={capa.id} variant="glass" className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getPriorityIcon(capa.priority)}
                    <h3 className="text-lg font-semibold text-gray-900">{capa.title}</h3>
                    <Badge variant="outline">{capa.capa_number}</Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{capa.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Created: {formatDate(capa.created_at)}</span>
                    </div>
                    {capa.due_date && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Due: {formatDate(capa.due_date)}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Assigned: {capa.assigned_to}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>Source: {capa.source_type} {capa.source_id}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(capa.priority)}
                    {getStatusBadge(capa.status)}
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

      {filteredCAPAs.length === 0 && (
        <Card variant="glass" className="text-center py-12">
          <CardContent>
            <ClipboardCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No CAPAs found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first CAPA'}
            </p>
            <Button asChild size="icon" className="gradient-success shadow-colored-success hover-glow-success group">
              <Link href="/dashboard/capa/new" title="Create CAPA">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

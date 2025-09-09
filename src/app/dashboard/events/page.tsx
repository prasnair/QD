'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
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
  Activity,
} from 'lucide-react'
import Link from 'next/link'
import { formatDate, formatRelativeTime } from '@/lib/utils'

interface QualityEvent {
  id: string
  event_number: string
  title: string
  description: string
  event_type: string
  severity: string
  status: string
  reported_by: string
  assigned_to?: string
  reported_date: string
  due_date?: string
  closed_date?: string
  created_at: string
  updated_at: string
}

export default function QualityEventsPage() {
  const { user } = useAuth()
  const [events, setEvents] = useState<QualityEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSeverity, setFilterSeverity] = useState('all')

  // Mock data for demonstration
  useEffect(() => {
    const mockEvents: QualityEvent[] = [
      {
        id: '1',
        event_number: 'QE-2024-001',
        title: 'Temperature Deviation in Storage Room A',
        description: 'Temperature exceeded acceptable range during routine monitoring',
        event_type: 'Deviation',
        severity: 'medium',
        status: 'open',
        reported_by: 'user1',
        assigned_to: 'user2',
        reported_date: '2024-01-15',
        due_date: '2024-01-22',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        event_number: 'QE-2024-002',
        title: 'Equipment Calibration Overdue',
        description: 'Balance calibration due date has passed without completion',
        event_type: 'Non-conformance',
        severity: 'high',
        status: 'under_investigation',
        reported_by: 'user3',
        assigned_to: 'user4',
        reported_date: '2024-01-10',
        due_date: '2024-01-17',
        created_at: '2024-01-10T14:30:00Z',
        updated_at: '2024-01-12T09:15:00Z',
      },
      {
        id: '3',
        event_number: 'QE-2024-003',
        title: 'Documentation Error in Batch Record',
        description: 'Incorrect entry found in batch manufacturing record',
        event_type: 'Documentation Error',
        severity: 'low',
        status: 'closed',
        reported_by: 'user5',
        assigned_to: 'user6',
        reported_date: '2024-01-05',
        due_date: '2024-01-12',
        closed_date: '2024-01-11',
        created_at: '2024-01-05T08:45:00Z',
        updated_at: '2024-01-11T16:20:00Z',
      },
    ]
    
    setTimeout(() => {
      setEvents(mockEvents)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.event_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus
    const matchesSeverity = filterSeverity === 'all' || event.severity === filterSeverity
    
    return matchesSearch && matchesStatus && matchesSeverity
  })

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />
      case 'medium':
        return <Activity className="w-4 h-4 text-yellow-600" />
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    const severityMap = {
      critical: { label: 'Critical', className: 'bg-red-100 text-red-800' },
      high: { label: 'High', className: 'bg-orange-100 text-orange-800' },
      medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      low: { label: 'Low', className: 'bg-green-100 text-green-800' },
    }
    
    const severityInfo = severityMap[severity as keyof typeof severityMap] || severityMap.medium
    return (
      <Badge className={severityInfo.className}>
        {severityInfo.label}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      open: { label: 'Open', className: 'bg-blue-100 text-blue-800' },
      under_investigation: { label: 'Under Investigation', className: 'bg-yellow-100 text-yellow-800' },
      pending_approval: { label: 'Pending Approval', className: 'bg-orange-100 text-orange-800' },
      closed: { label: 'Closed', className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Cancelled', className: 'bg-gray-100 text-gray-800' },
    }
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.open
    return (
      <Badge className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    )
  }

  const getOverdueEvents = () => {
    const today = new Date()
    return events.filter(event => {
      if (!event.due_date || event.status === 'closed' || event.status === 'cancelled') return false
      return new Date(event.due_date) < today
    }).length
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quality Events</h1>
            <p className="text-gray-600 mt-2">Track and manage quality events and deviations</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Quality Events</h1>
          <p className="text-gray-600 mt-2">Track and manage quality events and deviations</p>
        </div>
        <Button asChild size="icon" className="gradient-warning shadow-colored-warning hover-glow-warning group">
          <Link href="/dashboard/events/new" title="New Event">
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
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Events</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.filter(e => e.status === 'open').length}
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
                <p className="text-2xl font-bold text-red-600">{getOverdueEvents()}</p>
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
                  {events.filter(e => e.status === 'closed').length}
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
                  placeholder="Search events..."
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
                <option value="open">Open</option>
                <option value="under_investigation">Under Investigation</option>
                <option value="pending_approval">Pending Approval</option>
                <option value="closed">Closed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} variant="glass" className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getSeverityIcon(event.severity)}
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    <Badge variant="outline">{event.event_number}</Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Reported: {formatDate(event.reported_date)}</span>
                    </div>
                    {event.due_date && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Due: {formatDate(event.due_date)}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Reporter: {event.reported_by}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-2">
                    {getSeverityBadge(event.severity)}
                    {getStatusBadge(event.status)}
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

      {filteredEvents.length === 0 && (
        <Card variant="glass" className="text-center py-12">
          <CardContent>
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== 'all' || filterSeverity !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first quality event'}
            </p>
            <Button asChild className="gradient-warning shadow-colored-warning hover-glow-warning">
              <Link href="/dashboard/events/new">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

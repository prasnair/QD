'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Search,
  FileText,
  AlertTriangle,
  ClipboardCheck,
  GitBranch,
  Users,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Filter,
  X,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Star,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import { formatDate, formatRelativeTime } from '@/lib/utils'

interface SearchResult {
  id: string
  type: 'document' | 'event' | 'capa' | 'change' | 'user'
  title: string
  description: string
  number?: string
  status?: string
  priority?: string
  created_by?: string
  created_at: string
  updated_at: string
  href: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('relevance')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [searchInput, setSearchInput] = useState(query)

  // Mock search results - in a real app, this would be an API call
  useEffect(() => {
    if (query.trim()) {
      setLoading(true)
      
      // Simulate API delay
      setTimeout(() => {
        const mockResults: SearchResult[] = [
          {
            id: '1',
            type: 'document',
            title: 'Standard Operating Procedure - Equipment Calibration',
            description: 'This SOP describes the procedures for calibrating laboratory equipment including balances, pipettes, and temperature monitoring devices.',
            number: 'SOP-001',
            status: 'effective',
            created_by: 'Emily Davis',
            created_at: '2024-01-10T10:00:00Z',
            updated_at: '2024-01-15T14:30:00Z',
            href: '/dashboard/documents/1'
          },
          {
            id: '2',
            type: 'event',
            title: 'Temperature Deviation in Storage Room A',
            description: 'Temperature exceeded acceptable range (2-8°C) during routine monitoring. Peak temperature reached 12°C for 2 hours.',
            number: 'QE-2024-001',
            status: 'open',
            priority: 'medium',
            created_by: 'Lisa Brown',
            created_at: '2024-01-15T10:00:00Z',
            updated_at: '2024-01-15T10:00:00Z',
            href: '/dashboard/events/2'
          },
          {
            id: '3',
            type: 'capa',
            title: 'Improve Temperature Monitoring System',
            description: 'Implement automated temperature monitoring with alerts for Storage Room A to prevent future deviations',
            number: 'CAPA-2024-001',
            status: 'implementation',
            priority: 'high',
            created_by: 'Sarah Johnson',
            created_at: '2024-01-20T10:00:00Z',
            updated_at: '2024-01-25T14:30:00Z',
            href: '/dashboard/capa/3'
          },
          {
            id: '4',
            type: 'change',
            title: 'Update Cleaning Procedure for Lab B',
            description: 'Modify the cleaning procedure to include new disinfectant requirements and extended contact time',
            number: 'CR-2024-001',
            status: 'pending_approval',
            priority: 'medium',
            created_by: 'Robert Taylor',
            created_at: '2024-01-25T10:00:00Z',
            updated_at: '2024-01-28T14:30:00Z',
            href: '/dashboard/changes/4'
          },
          {
            id: '5',
            type: 'document',
            title: 'Quality Policy Manual',
            description: 'This document outlines the quality policy and objectives for the organization including compliance requirements and quality standards.',
            number: 'QPM-001',
            status: 'pending_approval',
            created_by: 'Emily Davis',
            created_at: '2024-01-20T09:00:00Z',
            updated_at: '2024-01-25T16:45:00Z',
            href: '/dashboard/documents/5'
          },
          {
            id: '6',
            type: 'user',
            title: 'Sarah Johnson',
            description: 'Quality Manager - Quality Assurance Department',
            created_by: 'System',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            href: '/dashboard/users/6'
          }
        ]

        // Filter results based on query (simple text matching)
        const filteredResults = mockResults.filter(result =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase()) ||
          result.number?.toLowerCase().includes(query.toLowerCase()) ||
          result.created_by?.toLowerCase().includes(query.toLowerCase())
        )

        setSearchResults(filteredResults)
        setLoading(false)
      }, 800)
    } else {
      setSearchResults([])
    }
  }, [query])

  // Enhanced filtering and sorting
  const filteredAndSortedResults = useMemo(() => {
    let filtered = searchResults.filter(result => {
      const matchesType = filterType === 'all' || result.type === filterType
      const matchesStatus = filterStatus === 'all' || result.status === filterStatus
      return matchesType && matchesStatus
    })

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date_asc':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case 'date_desc':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'title_asc':
          return a.title.localeCompare(b.title)
        case 'title_desc':
          return b.title.localeCompare(a.title)
        case 'relevance':
        default:
          // Simple relevance scoring based on query match
          const aScore = getRelevanceScore(a, query)
          const bScore = getRelevanceScore(b, query)
          return bScore - aScore
      }
    })

    return filtered
  }, [searchResults, filterType, filterStatus, sortBy, query])

  const getRelevanceScore = (result: SearchResult, query: string) => {
    let score = 0
    const lowerQuery = query.toLowerCase()
    
    // Title match gets highest score
    if (result.title.toLowerCase().includes(lowerQuery)) score += 10
    // Number match gets high score
    if (result.number?.toLowerCase().includes(lowerQuery)) score += 8
    // Description match gets medium score
    if (result.description.toLowerCase().includes(lowerQuery)) score += 5
    // Creator match gets low score
    if (result.created_by?.toLowerCase().includes(lowerQuery)) score += 3
    
    return score
  }

  // Handle instant search
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)
    
    // Debounced search - in a real app, this would call an API
    if (value.trim()) {
      setLoading(true)
      setTimeout(() => {
        // Filter existing results based on new input
        const filtered = searchResults.filter(result =>
          result.title.toLowerCase().includes(value.toLowerCase()) ||
          result.description.toLowerCase().includes(value.toLowerCase()) ||
          result.number?.toLowerCase().includes(value.toLowerCase()) ||
          result.created_by?.toLowerCase().includes(value.toLowerCase())
        )
        setSearchResults(filtered)
        setLoading(false)
      }, 300)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-5 h-5" />
      case 'event':
        return <AlertTriangle className="w-5 h-5" />
      case 'capa':
        return <ClipboardCheck className="w-5 h-5" />
      case 'change':
        return <GitBranch className="w-5 h-5" />
      case 'user':
        return <Users className="w-5 h-5" />
      default:
        return <Search className="w-5 h-5" />
    }
  }

  const getTypeGradient = (type: string) => {
    switch (type) {
      case 'document':
        return 'gradient-primary'
      case 'event':
        return 'gradient-warning'
      case 'capa':
        return 'gradient-success'
      case 'change':
        return 'gradient-secondary'
      case 'user':
        return 'gradient-info'
      default:
        return 'gradient-primary'
    }
  }

  const getStatusBadge = (status?: string) => {
    if (!status) return null
    
    const statusMap = {
      effective: { label: 'Effective', className: 'bg-green-100 text-green-800' },
      pending_approval: { label: 'Pending Approval', className: 'bg-yellow-100 text-yellow-800' },
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      open: { label: 'Open', className: 'bg-blue-100 text-blue-800' },
      closed: { label: 'Closed', className: 'bg-green-100 text-green-800' },
      implementation: { label: 'Implementation', className: 'bg-orange-100 text-orange-800' },
      pending_review: { label: 'Pending Review', className: 'bg-yellow-100 text-yellow-800' },
    }
    
    const statusInfo = statusMap[status as keyof typeof statusMap]
    if (!statusInfo) return null
    
    return (
      <Badge className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    )
  }

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null
    
    const priorityMap = {
      critical: { label: 'Critical', className: 'bg-red-100 text-red-800' },
      high: { label: 'High', className: 'bg-orange-100 text-orange-800' },
      medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      low: { label: 'Low', className: 'bg-green-100 text-green-800' },
    }
    
    const priorityInfo = priorityMap[priority as keyof typeof priorityMap]
    if (!priorityInfo) return null
    
    return (
      <Badge className={priorityInfo.className}>
        {priorityInfo.label}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Search className="w-8 h-8 text-gray-400" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Searching...</h1>
            <p className="text-gray-600">Looking for "{query}"</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} variant="glass" className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Search Bar */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Search className="w-8 h-8 text-gray-400" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Search</h1>
            <p className="text-gray-600">
              {query ? `Found ${filteredAndSortedResults.length} results for "${query}"` : 'Search across all your quality management data'}
            </p>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search documents, events, CAPAs, users..."
                value={searchInput}
                onChange={handleSearchInputChange}
                className="pl-12 pr-4 py-3 text-lg bg-white border-gray-200 focus:border-primary-500 focus:ring-primary-500"
              />
              {searchInput && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSearchInput('')
                    setSearchResults([])
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters and Controls */}
      {query && (
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All Types</option>
                    <option value="document">Documents</option>
                    <option value="event">Quality Events</option>
                    <option value="capa">CAPAs</option>
                    <option value="change">Change Controls</option>
                    <option value="user">Users</option>
                  </select>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All Status</option>
                    <option value="effective">Effective</option>
                    <option value="pending_approval">Pending Approval</option>
                    <option value="draft">Draft</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="implementation">Implementation</option>
                  </select>
                </div>
              </div>

              {/* Sort and View Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="date_desc">Newest First</option>
                    <option value="date_asc">Oldest First</option>
                    <option value="title_asc">Title A-Z</option>
                    <option value="title_desc">Title Z-A</option>
                  </select>
                </div>

                <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {!query ? (
        <Card variant="glass" className="text-center py-12">
          <CardContent>
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start your search</h3>
            <p className="text-gray-600">
              Use the search bar in the header to find documents, events, CAPAs, and more.
            </p>
          </CardContent>
        </Card>
      ) : filteredAndSortedResults.length === 0 ? (
        <Card variant="glass" className="text-center py-12">
          <CardContent>
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any results for "{query}". Try adjusting your search terms or filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFilterType('all')
                setFilterStatus('all')
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
          {filteredAndSortedResults.map((result) => (
            <Card key={result.id} variant="glass" className="hover-lift">
              <CardContent className={viewMode === 'grid' ? 'p-4' : 'p-6'}>
                {viewMode === 'grid' ? (
                  // Grid View Layout
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 ${getTypeGradient(result.type)} rounded-lg flex items-center justify-center shadow-colored`}>
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        {getStatusBadge(result.status)}
                        {getPriorityBadge(result.priority)}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{result.title}</h3>
                      {result.number && (
                        <Badge variant="outline" className="mb-2">{result.number}</Badge>
                      )}
                      <p className="text-gray-600 text-sm line-clamp-3 mb-3">{result.description}</p>
                    </div>
                    
                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Created: {formatDate(result.created_at)}</span>
                      </div>
                      {result.created_by && (
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>By: {result.created_by}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button asChild variant="ghost" size="sm" className="w-full">
                      <Link href={result.href}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  // List View Layout
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${getTypeGradient(result.type)} rounded-lg flex items-center justify-center shadow-colored`}>
                      {getTypeIcon(result.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{result.title}</h3>
                            {result.number && (
                              <Badge variant="outline">{result.number}</Badge>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-3">{result.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Created: {formatDate(result.created_at)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>Updated: {formatRelativeTime(result.updated_at)}</span>
                            </div>
                            {result.created_by && (
                              <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>By: {result.created_by}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(result.status)}
                            {getPriorityBadge(result.priority)}
                          </div>
                          
                          <Button asChild variant="ghost" size="sm">
                            <Link href={result.href}>
                              View Details
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

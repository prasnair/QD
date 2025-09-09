'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Shield,
  Mail,
  Phone,
  Building,
} from 'lucide-react'
import Link from 'next/link'
import { formatDate, formatRelativeTime, getInitials } from '@/lib/utils'

interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  job_title?: string
  department?: string
  phone?: string
  avatar_url?: string
  is_active: boolean
  last_login?: string
  roles: string[]
  created_at: string
  updated_at: string
}

export default function UsersPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDepartment, setFilterDepartment] = useState('all')

  // Mock data for demonstration
  useEffect(() => {
    const mockUsers: UserProfile[] = [
      {
        id: '1',
        email: 'john.doe@company.com',
        first_name: 'John',
        last_name: 'Doe',
        job_title: 'Quality Manager',
        department: 'Quality Assurance',
        phone: '+1-555-0123',
        is_active: true,
        last_login: '2024-01-30T09:15:00Z',
        roles: ['quality_manager', 'qa_reviewer'],
        created_at: '2024-01-01T10:00:00Z',
        updated_at: '2024-01-30T09:15:00Z',
      },
      {
        id: '2',
        email: 'jane.smith@company.com',
        first_name: 'Jane',
        last_name: 'Smith',
        job_title: 'Document Controller',
        department: 'Quality Assurance',
        phone: '+1-555-0124',
        is_active: true,
        last_login: '2024-01-29T14:30:00Z',
        roles: ['document_controller'],
        created_at: '2024-01-02T11:00:00Z',
        updated_at: '2024-01-29T14:30:00Z',
      },
      {
        id: '3',
        email: 'mike.chen@company.com',
        first_name: 'Mike',
        last_name: 'Chen',
        job_title: 'Lab Technician',
        department: 'Laboratory',
        phone: '+1-555-0125',
        is_active: true,
        last_login: '2024-01-30T08:45:00Z',
        roles: ['general_user'],
        created_at: '2024-01-03T12:00:00Z',
        updated_at: '2024-01-30T08:45:00Z',
      },
      {
        id: '4',
        email: 'sarah.wilson@company.com',
        first_name: 'Sarah',
        last_name: 'Wilson',
        job_title: 'CAPA Investigator',
        department: 'Quality Assurance',
        phone: '+1-555-0126',
        is_active: false,
        last_login: '2024-01-15T16:20:00Z',
        roles: ['capa_owner'],
        created_at: '2024-01-04T13:00:00Z',
        updated_at: '2024-01-15T16:20:00Z',
      },
    ]
    
    setTimeout(() => {
      setUsers(mockUsers)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.job_title?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && user.is_active) ||
                         (filterStatus === 'inactive' && !user.is_active)
    const matchesDepartment = filterDepartment === 'all' || user.department === filterDepartment
    
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const getRoleBadge = (role: string) => {
    const roleMap = {
      organization_admin: { label: 'Admin', className: 'bg-red-100 text-red-800' },
      quality_manager: { label: 'Quality Manager', className: 'bg-blue-100 text-blue-800' },
      qa_reviewer: { label: 'QA Reviewer', className: 'bg-green-100 text-green-800' },
      document_controller: { label: 'Document Controller', className: 'bg-purple-100 text-purple-800' },
      capa_owner: { label: 'CAPA Owner', className: 'bg-orange-100 text-orange-800' },
      department_head: { label: 'Department Head', className: 'bg-yellow-100 text-yellow-800' },
      general_user: { label: 'General User', className: 'bg-gray-100 text-gray-800' },
    }
    
    const roleInfo = roleMap[role as keyof typeof roleMap] || roleMap.general_user
    return (
      <Badge className={roleInfo.className}>
        {roleInfo.label}
      </Badge>
    )
  }

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">
        <XCircle className="w-3 h-3 mr-1" />
        Inactive
      </Badge>
    )
  }

  const getDepartments = () => {
    const departments = [...new Set(users.map(user => user.department).filter(Boolean))]
    return departments
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600 mt-2">Manage user accounts and permissions</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-2">Manage user accounts and permissions</p>
        </div>
        <Button asChild size="icon" className="gradient-primary shadow-colored hover-glow group">
          <Link href="/dashboard/users/new" title="Add User">
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
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.is_active).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => !u.is_active).length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Online Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.last_login && new Date(u.last_login) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
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
                  placeholder="Search users..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Departments</option>
                {getDepartments().map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((userProfile) => (
          <Card key={userProfile.id} variant="glass" className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium text-sm">
                    {getInitials(userProfile.first_name, userProfile.last_name)}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {userProfile.first_name} {userProfile.last_name}
                    </h3>
                    {getStatusBadge(userProfile.is_active)}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{userProfile.email}</span>
                    </div>
                    
                    {userProfile.job_title && (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{userProfile.job_title}</span>
                      </div>
                    )}
                    
                    {userProfile.department && (
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4" />
                        <span>{userProfile.department}</span>
                      </div>
                    )}
                    
                    {userProfile.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{userProfile.phone}</span>
                      </div>
                    )}
                    
                    {userProfile.last_login && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Last login: {formatRelativeTime(userProfile.last_login)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1">
                      {userProfile.roles.map((role) => (
                        <div key={role}>
                          {getRoleBadge(role)}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card variant="glass" className="text-center py-12">
          <CardContent>
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== 'all' || filterDepartment !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first user'}
            </p>
            <Button asChild size="icon" className="gradient-primary shadow-colored hover-glow group">
              <Link href="/dashboard/users/new" title="Add User">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

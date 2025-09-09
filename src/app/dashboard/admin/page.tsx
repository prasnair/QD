'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Settings,
  Users,
  Shield,
  Database,
  FileText,
  Bell,
  Globe,
  Key,
  Activity,
  BarChart3,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'workflows', label: 'Workflows', icon: FileText },
    { id: 'system', label: 'System Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'backup', label: 'Backup & Restore', icon: Database },
  ]

  const systemStats = [
    { label: 'Total Users', value: '24', icon: Users, color: 'text-blue-600' },
    { label: 'Active Sessions', value: '8', icon: Activity, color: 'text-green-600' },
    { label: 'Documents', value: '1,247', icon: FileText, color: 'text-purple-600' },
    { label: 'Quality Events', value: '23', icon: AlertTriangle, color: 'text-orange-600' },
  ]

  const recentActivities = [
    {
      id: 1,
      action: 'User created',
      user: 'John Doe',
      target: 'Jane Smith',
      timestamp: '2 hours ago',
      type: 'user',
    },
    {
      id: 2,
      action: 'Document approved',
      user: 'Mike Chen',
      target: 'SOP-001 v2.1',
      timestamp: '4 hours ago',
      type: 'document',
    },
    {
      id: 3,
      action: 'CAPA closed',
      user: 'Sarah Wilson',
      target: 'CAPA-2024-003',
      timestamp: '1 day ago',
      type: 'capa',
    },
    {
      id: 4,
      action: 'System backup',
      user: 'System',
      target: 'Database backup',
      timestamp: '2 days ago',
      type: 'system',
    },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat) => (
          <Card key={stat.label} variant="glass">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Recent Activities</span>
          </CardTitle>
          <CardDescription>
            Latest system activities and user actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 glass rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-blue-100' :
                  activity.type === 'document' ? 'bg-purple-100' :
                  activity.type === 'capa' ? 'bg-green-100' :
                  'bg-gray-100'
                }`}>
                  {activity.type === 'user' && <Users className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'document' && <FileText className="w-4 h-4 text-purple-600" />}
                  {activity.type === 'capa' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {activity.type === 'system' && <Settings className="w-4 h-4 text-gray-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user} {activity.action} {activity.target}
                  </p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Users className="w-6 h-6" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <FileText className="w-6 h-6" />
              <span>Configure Workflows</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Database className="w-6 h-6" />
              <span>System Backup</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Shield className="w-6 h-6" />
              <span>Security Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Bell className="w-6 h-6" />
              <span>Notification Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Globe className="w-6 h-6" />
              <span>Organization Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderUserManagement = () => (
    <div className="space-y-6">
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>User Management</span>
          </CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">User Roles & Permissions</h3>
              <p className="text-sm text-gray-600">Configure role-based access control</p>
            </div>
            <Button asChild>
              <Link href="/dashboard/users">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Default Role for New Users</Label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>General User</option>
                <option>QA Reviewer</option>
                <option>Document Controller</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Password Policy</Label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>Standard (8+ characters)</option>
                <option>Strong (12+ characters, special chars)</option>
                <option>Enterprise (Complex requirements)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="glass">
        <CardHeader>
          <CardTitle>Bulk User Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Users
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Users
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync with AD
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderWorkflows = () => (
    <div className="space-y-6">
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Workflow Configuration</span>
          </CardTitle>
          <CardDescription>
            Configure approval workflows for documents, events, and changes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Document Approval Workflow</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <Badge>1</Badge>
                <span>Draft Creation</span>
                <Badge variant="outline">Auto</Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <Badge>2</Badge>
                <span>QA Review</span>
                <Badge variant="outline">QA Reviewer</Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <Badge>3</Badge>
                <span>Final Approval</span>
                <Badge variant="outline">Quality Manager</Badge>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">CAPA Workflow</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <Badge>1</Badge>
                <span>Investigation</span>
                <Badge variant="outline">CAPA Owner</Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <Badge>2</Badge>
                <span>Action Plan</span>
                <Badge variant="outline">CAPA Owner</Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <Badge>3</Badge>
                <span>Implementation</span>
                <Badge variant="outline">Assigned User</Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <Badge>4</Badge>
                <span>Effectiveness Check</span>
                <Badge variant="outline">Quality Manager</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>System Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Organization Name</Label>
                <Input placeholder="Enter organization name" />
              </div>
              <div>
                <Label>Time Zone</Label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>UTC</option>
                  <option>America/New_York</option>
                  <option>America/Los_Angeles</option>
                  <option>Europe/London</option>
                </select>
              </div>
              <div>
                <Label>Date Format</Label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Email Notifications</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Task assignments</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Approval requests</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Overdue alerts</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSecurity = () => (
    <div className="space-y-6">
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Security Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Session Timeout (minutes)</Label>
                <Input type="number" placeholder="30" />
              </div>
              <div>
                <Label>Failed Login Attempts</Label>
                <Input type="number" placeholder="5" />
              </div>
              <div>
                <Label>Password Expiry (days)</Label>
                <Input type="number" placeholder="90" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Two-Factor Authentication</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Enable 2FA for all users</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Require 2FA for admins</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBackup = () => (
    <div className="space-y-6">
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>Backup & Restore</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Backup Operations</h3>
              <div className="space-y-3">
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Create Full Backup
                </Button>
                <Button variant="outline" className="w-full">
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule Automatic Backup
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Restore Operations</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Restore from Backup
                </Button>
                <Button variant="outline" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset to Default
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'users':
        return renderUserManagement()
      case 'workflows':
        return renderWorkflows()
      case 'system':
        return renderSystemSettings()
      case 'security':
        return renderSecurity()
      case 'backup':
        return renderBackup()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
        <p className="text-gray-600 mt-2">System configuration and management</p>
      </div>

      {/* Tabs */}
      <Card variant="glass">
        <CardContent className="p-0">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  )
}

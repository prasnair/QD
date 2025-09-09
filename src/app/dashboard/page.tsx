'use client'

import { useAuth } from '@/components/providers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  FileText,
  AlertTriangle,
  ClipboardCheck,
  GitBranch,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  ArrowRight,
} from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()

  const stats = [
    {
      title: 'Total Documents',
      value: '1,247',
      change: '+12%',
      changeType: 'positive' as const,
      icon: FileText,
      gradient: 'gradient-primary',
    },
    {
      title: 'Open Events',
      value: '23',
      change: '-5%',
      changeType: 'positive' as const,
      icon: AlertTriangle,
      gradient: 'gradient-warning',
    },
    {
      title: 'Active CAPAs',
      value: '8',
      change: '+2',
      changeType: 'neutral' as const,
      icon: ClipboardCheck,
      gradient: 'gradient-success',
    },
    {
      title: 'Pending Changes',
      value: '15',
      change: '+3',
      changeType: 'neutral' as const,
      icon: GitBranch,
      gradient: 'gradient-secondary',
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'document',
      title: 'SOP-001 v2.1 approved',
      description: 'Standard Operating Procedure for Equipment Calibration',
      user: 'Sarah Johnson',
      timestamp: '2 hours ago',
      status: 'approved',
    },
    {
      id: 2,
      type: 'event',
      title: 'Quality Event QE-2024-001 created',
      description: 'Temperature deviation in Storage Room A',
      user: 'Mike Chen',
      timestamp: '4 hours ago',
      status: 'open',
    },
    {
      id: 3,
      type: 'capa',
      title: 'CAPA-2024-003 completed',
      description: 'Root cause analysis for equipment failure',
      user: 'Emily Davis',
      timestamp: '1 day ago',
      status: 'completed',
    },
    {
      id: 4,
      type: 'change',
      title: 'Change Request CR-2024-012 submitted',
      description: 'Update to cleaning procedure for Lab B',
      user: 'David Wilson',
      timestamp: '2 days ago',
      status: 'pending',
    },
  ]

  const quickActions = [
    {
      title: 'Create Document',
      description: 'Start a new controlled document',
      icon: FileText,
      href: '/dashboard/documents/new',
      gradient: 'gradient-primary',
    },
    {
      title: 'Log Quality Event',
      description: 'Report a quality issue',
      icon: AlertTriangle,
      href: '/dashboard/events/new',
      gradient: 'gradient-warning',
    },
    {
      title: 'Initiate CAPA',
      description: 'Start corrective action',
      icon: ClipboardCheck,
      href: '/dashboard/capa/new',
      gradient: 'gradient-success',
    },
    {
      title: 'Request Change',
      description: 'Submit change control',
      icon: GitBranch,
      href: '/dashboard/changes/new',
      gradient: 'gradient-secondary',
    },
  ]

  return (
    <div className="space-y-3">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} variant="glass" className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-success-600' : 
                    stat.changeType === 'negative' ? 'text-error-600' : 'text-gray-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.gradient} rounded-xl flex items-center justify-center shadow-colored`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card variant="glass" className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Latest updates across your quality management system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 glass rounded-xl hover-lift">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'document' ? 'gradient-primary' :
                    activity.type === 'event' ? 'gradient-warning' :
                    activity.type === 'capa' ? 'gradient-success' : 'gradient-secondary'
                  }`}>
                    {activity.type === 'document' && <FileText className="w-5 h-5 text-white" />}
                    {activity.type === 'event' && <AlertTriangle className="w-5 h-5 text-white" />}
                    {activity.type === 'capa' && <ClipboardCheck className="w-5 h-5 text-white" />}
                    {activity.type === 'change' && <GitBranch className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">by {activity.user}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'approved' ? 'bg-success-100 text-success-800' :
                    activity.status === 'open' ? 'bg-warning-100 text-warning-800' :
                    activity.status === 'completed' ? 'bg-success-100 text-success-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card variant="glass" className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>
                Common tasks to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  variant="ghost"
                  className="w-full justify-start p-3 h-auto hover:bg-transparent-20"
                  asChild
                >
                  <a href={action.href}>
                    <div className={`w-10 h-10 ${action.gradient} rounded-lg flex items-center justify-center mr-3 shadow-colored`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{action.title}</p>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                  </a>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

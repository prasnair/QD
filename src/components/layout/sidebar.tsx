'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/providers'
import { useSidebar } from '@/contexts/sidebar-context'
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  ClipboardCheck,
  GitBranch,
  Users,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Quality Events', href: '/dashboard/events', icon: AlertTriangle },
  { name: 'CAPA', href: '/dashboard/capa', icon: ClipboardCheck },
  { name: 'Change Control', href: '/dashboard/changes', icon: GitBranch },
  { name: 'Users', href: '/dashboard/users', icon: Users },
  { name: 'Administration', href: '/dashboard/admin', icon: Settings },
]

export function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar()
  const pathname = usePathname()
  const { user, organization, signOut } = useAuth()

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-screen transition-all duration-300",
      "hidden lg:block", // Hide on mobile, show on large screens
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="h-full glass border-r border-white/20 shadow-glass">
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">QMSDesk</h1>
                  {organization && (
                    <p className="text-xs text-gray-600 truncate">{organization.name}</p>
                  )}
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapsed}
              className="h-8 w-8 hover:bg-transparent-20"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg text-sm font-medium transition-all duration-200 hover-lift",
                  collapsed ? "justify-center px-3 py-2.5" : "space-x-3 px-3 py-2.5",
                  isActive
                    ? "gradient-primary text-white shadow-colored"
                    : "text-gray-700 hover:bg-transparent-20 hover:text-gray-900"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-white" : "text-gray-500"
                )} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/20">
          {!collapsed && user && (
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 gradient-secondary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-xs text-gray-600 truncate">{user.job_title}</p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            onClick={signOut}
            className={cn(
              "w-full justify-start text-gray-700 hover:bg-transparent-20 hover:text-gray-900",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span className="ml-2">Sign out</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}

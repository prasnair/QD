'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Bell, Search, Menu, User, ChevronRight, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/components/providers'
import { useSidebar } from '@/contexts/sidebar-context'
import Link from 'next/link'

export function Header() {
  const { user } = useAuth()
  const { toggleCollapsed } = useSidebar()
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = [
      { name: 'Dashboard', href: '/dashboard', icon: Home }
    ]
    
    if (segments.length > 1) {
      const moduleMap: { [key: string]: string } = {
        'documents': 'Documents',
        'events': 'Quality Events', 
        'capa': 'CAPA',
        'changes': 'Change Control',
        'users': 'Users',
        'admin': 'Administration',
        'search': 'Search Results'
      }
      
      const module = segments[1]
      if (moduleMap[module]) {
        breadcrumbs.push({
          name: moduleMap[module],
          href: `/dashboard/${module}`,
          icon: null
        })
      }
    }
    
    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <header className="glass border-b border-white/20 shadow-glass">
      <div className="px-4 lg:px-6 py-3">
        {/* Breadcrumbs - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-600 mb-3">
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.href} className="flex items-center space-x-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
              <Link 
                href={breadcrumb.href}
                className={`flex items-center space-x-1 hover:text-gray-900 transition-colors ${
                  index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : ''
                }`}
              >
                {breadcrumb.icon && <breadcrumb.icon className="w-4 h-4" />}
                <span>{breadcrumb.name}</span>
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="lg:hidden hover:bg-transparent-20"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Search */}
          <div className="w-full lg:flex-1 lg:max-w-md">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search documents, events, CAPAs..."
                  variant="transparent"
                  className="pl-10 bg-transparent-10 border-white/20 focus:border-primary-400/50 w-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3 lg:space-x-4 w-full lg:w-auto justify-between lg:justify-end">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-transparent-20">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-gray-600">{user?.job_title}</p>
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-transparent-20">
                <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

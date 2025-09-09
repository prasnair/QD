import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date) {
  const now = new Date()
  const targetDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(date)
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}

export function getStatusColor(status: string) {
  const statusColors: Record<string, string> = {
    draft: 'text-gray-600 bg-gray-100',
    pending: 'text-yellow-700 bg-yellow-100',
    approved: 'text-green-700 bg-green-100',
    rejected: 'text-red-700 bg-red-100',
    active: 'text-blue-700 bg-blue-100',
    inactive: 'text-gray-600 bg-gray-100',
    open: 'text-orange-700 bg-orange-100',
    closed: 'text-gray-700 bg-gray-100',
    completed: 'text-green-700 bg-green-100',
    cancelled: 'text-red-700 bg-red-100',
  }
  
  return statusColors[status.toLowerCase()] || 'text-gray-600 bg-gray-100'
}

export function getPriorityColor(priority: string) {
  const priorityColors: Record<string, string> = {
    low: 'text-gray-600 bg-gray-100',
    medium: 'text-yellow-700 bg-yellow-100',
    high: 'text-orange-700 bg-orange-100',
    critical: 'text-red-700 bg-red-100',
  }
  
  return priorityColors[priority.toLowerCase()] || 'text-gray-600 bg-gray-100'
}

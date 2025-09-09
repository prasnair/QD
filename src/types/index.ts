export interface User {
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
  organization_id: string
  roles: string[]
}

export interface Organization {
  id: string
  name: string
  slug: string
  logo_url?: string
  settings?: Record<string, any>
}

export interface Document {
  id: string
  title: string
  document_number: string
  version: string
  document_type: string
  status: DocumentStatus
  content?: string
  file_url?: string
  effective_date?: string
  review_date?: string
  created_by: string
  approved_by?: string
  created_at: string
  updated_at: string
}

export interface QualityEvent {
  id: string
  event_number: string
  title: string
  description: string
  event_type: string
  severity: EventSeverity
  status: EventStatus
  reported_by: string
  assigned_to?: string
  reported_date: string
  due_date?: string
  closed_date?: string
  created_at: string
  updated_at: string
}

export interface CAPA {
  id: string
  capa_number: string
  title: string
  description: string
  source_type: string
  source_id: string
  status: CAPAStatus
  priority: Priority
  assigned_to: string
  due_date?: string
  completed_date?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface ChangeControl {
  id: string
  change_number: string
  title: string
  description: string
  change_type: string
  status: ChangeStatus
  priority: Priority
  requested_by: string
  approved_by?: string
  due_date?: string
  completed_date?: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  type: TaskType
  status: TaskStatus
  priority: Priority
  assigned_to: string
  due_date?: string
  completed_date?: string
  related_type?: string
  related_id?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  user_id: string
  action: string
  table_name: string
  record_id: string
  old_values?: Record<string, any>
  new_values?: Record<string, any>
  ip_address?: string
  user_agent?: string
  created_at: string
}

// Enums
export type DocumentStatus = 'draft' | 'pending_review' | 'pending_approval' | 'approved' | 'effective' | 'superseded' | 'archived'
export type EventStatus = 'open' | 'under_investigation' | 'pending_approval' | 'closed' | 'cancelled'
export type EventSeverity = 'low' | 'medium' | 'high' | 'critical'
export type CAPAStatus = 'draft' | 'investigation' | 'action_plan' | 'implementation' | 'effectiveness_check' | 'closed' | 'cancelled'
export type ChangeStatus = 'draft' | 'pending_review' | 'pending_approval' | 'approved' | 'implemented' | 'closed' | 'cancelled'
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'
export type TaskType = 'review' | 'approval' | 'investigation' | 'implementation' | 'training' | 'other'
export type Priority = 'low' | 'medium' | 'high' | 'critical'

// Role types
export type UserRole = 
  | 'organization_admin'
  | 'quality_manager'
  | 'qa_reviewer'
  | 'document_controller'
  | 'capa_owner'
  | 'department_head'
  | 'general_user'

// Navigation types
export interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  current?: boolean
  children?: NavItem[]
}

// Dashboard types
export interface DashboardStats {
  totalDocuments: number
  pendingReviews: number
  openEvents: number
  activeCAPAs: number
  pendingChanges: number
  overdueTasks: number
}

export interface RecentActivity {
  id: string
  type: string
  title: string
  description: string
  user: string
  timestamp: string
  status: string
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'date' | 'file'
  required?: boolean
  options?: { value: string; label: string }[]
  placeholder?: string
  description?: string
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

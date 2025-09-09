export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          settings: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          settings?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          settings?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          organization_id: string
          email: string
          first_name: string
          last_name: string
          job_title: string | null
          department: string | null
          phone: string | null
          avatar_url: string | null
          is_active: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          organization_id: string
          email: string
          first_name: string
          last_name: string
          job_title?: string | null
          department?: string | null
          phone?: string | null
          avatar_url?: string | null
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          email?: string
          first_name?: string
          last_name?: string
          job_title?: string | null
          department?: string | null
          phone?: string | null
          avatar_url?: string | null
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: string
          organization_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: string
          organization_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: string
          organization_id?: string
          created_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          organization_id: string
          title: string
          document_number: string
          version: string
          document_type: string
          status: string
          content: string | null
          file_url: string | null
          effective_date: string | null
          review_date: string | null
          created_by: string
          approved_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          title: string
          document_number: string
          version: string
          document_type: string
          status: string
          content?: string | null
          file_url?: string | null
          effective_date?: string | null
          review_date?: string | null
          created_by: string
          approved_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          title?: string
          document_number?: string
          version?: string
          document_type?: string
          status?: string
          content?: string | null
          file_url?: string | null
          effective_date?: string | null
          review_date?: string | null
          created_by?: string
          approved_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      quality_events: {
        Row: {
          id: string
          organization_id: string
          event_number: string
          title: string
          description: string
          event_type: string
          severity: string
          status: string
          reported_by: string
          assigned_to: string | null
          reported_date: string
          due_date: string | null
          closed_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          event_number: string
          title: string
          description: string
          event_type: string
          severity: string
          status: string
          reported_by: string
          assigned_to?: string | null
          reported_date: string
          due_date?: string | null
          closed_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          event_number?: string
          title?: string
          description?: string
          event_type?: string
          severity?: string
          status?: string
          reported_by?: string
          assigned_to?: string | null
          reported_date?: string
          due_date?: string | null
          closed_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      capas: {
        Row: {
          id: string
          organization_id: string
          capa_number: string
          title: string
          description: string
          source_type: string
          source_id: string
          status: string
          priority: string
          assigned_to: string
          due_date: string | null
          completed_date: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          capa_number: string
          title: string
          description: string
          source_type: string
          source_id: string
          status: string
          priority: string
          assigned_to: string
          due_date?: string | null
          completed_date?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          capa_number?: string
          title?: string
          description?: string
          source_type?: string
          source_id?: string
          status?: string
          priority?: string
          assigned_to?: string
          due_date?: string | null
          completed_date?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      change_controls: {
        Row: {
          id: string
          organization_id: string
          change_number: string
          title: string
          description: string
          change_type: string
          status: string
          priority: string
          requested_by: string
          approved_by: string | null
          due_date: string | null
          completed_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          change_number: string
          title: string
          description: string
          change_type: string
          status: string
          priority: string
          requested_by: string
          approved_by?: string | null
          due_date?: string | null
          completed_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          change_number?: string
          title?: string
          description?: string
          change_type?: string
          status?: string
          priority?: string
          requested_by?: string
          approved_by?: string | null
          due_date?: string | null
          completed_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          organization_id: string
          title: string
          description: string | null
          type: string
          status: string
          priority: string
          assigned_to: string
          due_date: string | null
          completed_date: string | null
          related_type: string | null
          related_id: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          title: string
          description?: string | null
          type: string
          status: string
          priority: string
          assigned_to: string
          due_date?: string | null
          completed_date?: string | null
          related_type?: string | null
          related_id?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          title?: string
          description?: string | null
          type?: string
          status?: string
          priority?: string
          assigned_to?: string
          due_date?: string | null
          completed_date?: string | null
          related_type?: string | null
          related_id?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          organization_id: string
          user_id: string
          action: string
          table_name: string
          record_id: string
          old_values: Json | null
          new_values: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          user_id: string
          action: string
          table_name: string
          record_id: string
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          user_id?: string
          action?: string
          table_name?: string
          record_id?: string
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

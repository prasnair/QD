'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User, Organization } from '@/types'
import { User as SupabaseUser } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  organization: Organization | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user: supabaseUser } } = await supabase.auth.getUser()
        
        if (supabaseUser) {
          // Fetch user profile and organization
          const { data: profile } = await supabase
            .from('profiles')
            .select(`
              *,
              organizations (*)
            `)
            .eq('id', supabaseUser.id)
            .single()

          if (profile) {
            setUser({
              id: profile.id,
              email: profile.email,
              first_name: profile.first_name,
              last_name: profile.last_name,
              job_title: profile.job_title,
              department: profile.department,
              phone: profile.phone,
              avatar_url: profile.avatar_url,
              is_active: profile.is_active,
              last_login: profile.last_login,
              organization_id: profile.organization_id,
              roles: [] // Will be fetched separately
            })

            if (profile.organizations) {
              setOrganization(profile.organizations)
            }

            // Fetch user roles
            const { data: roles } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', supabaseUser.id)

            if (roles) {
              setUser(prev => prev ? {
                ...prev,
                roles: roles.map(r => r.role)
              } : null)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          setUser(null)
          setOrganization(null)
        } else if (event === 'SIGNED_IN' && session.user) {
          await getUser()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    organization,
    loading,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

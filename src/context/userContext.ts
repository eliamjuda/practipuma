'use client'

import * as React from 'react'
import { createClient } from '@/utils/supabase/client'
import { useSearchParams } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

interface UserContextType {
  user: User | null
  isLoading: boolean
  displayName: string
  firstName: string
  initials: string
  avatarUrl: string | null
  refreshUser: () => Promise<void>
}

const UserContext = React.createContext<UserContextType | undefined>(undefined)

export const useUser = (): UserContextType => {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser debe ser usado dentro de un UserProvider')
  }
  return context
}

const getDisplayName = (user: User | null): string => {
  if (!user) return 'Usuario'
  return user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario'
}

const getFirstName = (user: User | null): string => {
  if (!user) return 'Usuario'
  const fullName = user.user_metadata?.full_name
  if (fullName) {
    return fullName.split(' ')[0]
  }
  return user.email?.split('@')[0] || 'Usuario'
}

const getInitials = (user: User | null): string => {
  if (!user) return 'U'
  
  const fullName = user.user_metadata?.full_name
  if (fullName) {
    return fullName
      .split(' ')
      .map((word: string) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  if (user.email) {
    return user.email.charAt(0).toUpperCase()
  }
  
  return 'U'
}

function useAuthSync() {
  const searchParams = useSearchParams()
  const [shouldRefresh, setShouldRefresh] = React.useState(false)

  React.useEffect(() => {
    const shouldSync = searchParams.get('sync') === 'true'
    
    if (shouldSync) {
      const url = new URL(window.location.href)
      url.searchParams.delete('sync')
      window.history.replaceState({}, '', url.toString())
      
      setShouldRefresh(true)
    }
  }, [searchParams])

  return shouldRefresh
}

interface UserProviderProps {
  children: React.ReactNode
  initialUser?: User | null
}

export const UserProvider: React.FC<UserProviderProps> = ({ 
  children, 
  initialUser = null 
}) => {
  const [user, setUser] = React.useState<User | null>(initialUser)
  const [isLoading, setIsLoading] = React.useState(!initialUser)
  
  const supabase = React.useMemo(() => createClient(), [])
  const shouldRefresh = useAuthSync()

  const refreshUser = React.useCallback(async (): Promise<void> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (error) {
      console.error('Error al refrescar el usuario:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  React.useEffect(() => {
    if (shouldRefresh) {
      refreshUser()
    }
  }, [shouldRefresh, refreshUser])

  React.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setIsLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  const contextValue: UserContextType = React.useMemo(() => ({
    user,
    isLoading,
    displayName: getDisplayName(user),
    firstName: getFirstName(user),
    initials: getInitials(user),
    avatarUrl: user?.user_metadata?.avatar_url || null,
    refreshUser,
  }), [user, isLoading, refreshUser])

  return React.createElement(
    UserContext.Provider,
    { value: contextValue },
    children
  )
}


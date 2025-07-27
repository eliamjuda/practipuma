'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/client'
import type { User } from '@supabase/supabase-js'
import { useEffect } from 'react'

interface UserData {
  user: User | null
  displayName: string
  firstName: string
  initials: string
  avatarUrl: string | null
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

const transformUserData = (user: User | null): UserData => ({
  user,
  displayName: getDisplayName(user),
  firstName: getFirstName(user),
  initials: getInitials(user),
  avatarUrl: user?.user_metadata?.avatar_url || null,
})

const fetchUser = async (): Promise<UserData> => {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    console.error('Error al obtener el usuario:', error)
    return transformUserData(null)
  }
  
  return transformUserData(user)
}

export const useUserQuery = () => {
  const queryClient = useQueryClient()
  const supabase = createClient()

  const query = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (antes cacheTime)
    retry: 1,
    refetchOnWindowFocus: false,
  })

  // Escuchar cambios de autenticación de Supabase
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const userData = transformUserData(session?.user ?? null)
        queryClient.setQueryData(['user'], userData)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase, queryClient])

  const refreshUserMutation = useMutation({
    mutationFn: fetchUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data)
    },
  })

  return {
    ...query.data,
    isLoading: query.isLoading,
    refreshUser: refreshUserMutation.mutateAsync,
    isRefreshing: refreshUserMutation.isPending,
  }
}
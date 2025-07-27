'use client'

import { QueryClient } from '@tanstack/react-query'

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000, // 10 minutos
        retry: (failureCount, error) => {
          // No reintentar en errores de autenticación
          if (error && typeof error === 'object' && 'status' in error) {
            const statusError = error as { status: number }
            if (statusError.status === 401 || statusError.status === 403) {
              return false
            }
          }
          return failureCount < 2
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
      },
    },
  })
}

// Cliente singleton para el lado del cliente
let queryClient: QueryClient | undefined

export const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Servidor: siempre crear una nueva instancia
    return createQueryClient()
  }

  // Cliente: usar singleton
  if (!queryClient) {
    queryClient = createQueryClient()
  }
  return queryClient
}
export const runtime = 'edge';
import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Si `next` está en los params, usa eso como redirect URL; si no, redirect a dashboard
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        // Estamos en desarrollo local
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        // Estamos en producción con load balancer
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        // Fallback
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // Devolver al usuario a una página de error si algo salió mal
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
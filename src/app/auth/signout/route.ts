export const runtime = 'edge';

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  
  // Verificar si el usuario está logueado
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return NextResponse.json(
        { error: 'Error al cerrar sesión' }, 
        { status: 500 }
      )
    }
    
  } else {
    console.warn('No hay usuario logueado para cerrar sesión')
  }

  // Revalidar el layout para limpiar el estado de autenticación
  revalidatePath('/', 'layout')
  
  // Redirigir a la página de login
  return NextResponse.redirect(new URL('/', req.url), {
    status: 302,
  })
}
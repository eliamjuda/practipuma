'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signInWithEmail(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  console.log('🔄 Intentando login:', email)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('❌ Error de login:', error)
    
    // Mensajes de error más específicos
    let errorMessage = 'Error al iniciar sesión'
    
    if (error.message.includes('Invalid login credentials')) {
      errorMessage = 'Email o contraseña incorrectos'
    } else if (error.message.includes('Email not confirmed')) {
      errorMessage = 'Debes confirmar tu email antes de iniciar sesión'
    } else if (error.message.includes('User not found')) {
      errorMessage = 'No existe una cuenta con este email'
    } else if (error.message.includes('Signup is disabled')) {
      errorMessage = 'El registro está deshabilitado'
    } else {
      errorMessage = error.message
    }
    
    redirect(`/auth/login?message=${encodeURIComponent(errorMessage)}`)
  }

  // Verificar que el usuario esté confirmado
  if (data.user && !data.user.email_confirmed_at) {
    console.log('⚠️ Usuario no confirmado, cerrando sesión')
    await supabase.auth.signOut() // Cerrar sesión inmediatamente
    redirect(`/auth/login?message=${encodeURIComponent('Debes confirmar tu email antes de iniciar sesión')}`)
  }

  // Verificar que realmente tengamos un usuario válido
  if (!data.user || !data.session) {
    console.log('❌ No se pudo crear sesión válida')
    redirect(`/auth/login?message=${encodeURIComponent('Error al crear sesión')}`)
  }

  console.log('✅ Login exitoso:', data.user.email)
  
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signUpWithEmail(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  console.log('🔄 Intentando registrar usuario:', email)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard`
    }
  })

  if (error) {
    console.error('❌ Error de registro:', error)
    redirect(`/auth/register?message=${encodeURIComponent(error.message)}`)
  }

  console.log('✅ Usuario registrado:', data)
  console.log('📧 Email confirmation sent:', data.user?.email_confirmed_at ? 'Ya confirmado' : 'Pendiente de confirmación')

  // Redirigir a página de confirmación con el email
  redirect(`/auth/confirm?email=${encodeURIComponent(email)}`)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}

export async function signInWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    console.error('Error OAuth:', error)
    redirect('/auth/login?message=Error con Google')
  }

  if (data.url) {
    redirect(data.url) // Redirigir a Google
  }
}
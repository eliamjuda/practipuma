'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signInWithEmail(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('❌ Error de login:', error)
    
    // Mensajes de error más específicos y amigables
    let errorMessage = 'Error al iniciar sesión'
    
    if (error.message.includes('Invalid login credentials')) {
      errorMessage = 'Email o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo.'
    } else if (error.message.includes('Email not confirmed')) {
      errorMessage = 'Debes confirmar tu email antes de iniciar sesión. Revisa tu bandeja de entrada.'
    } else if (error.message.includes('User not found')) {
      errorMessage = 'No existe una cuenta con este email. ¿Te gustaría registrarte?'
    } else if (error.message.includes('too_many_requests')) {
      errorMessage = 'Demasiados intentos fallidos. Espera unos minutos antes de intentar de nuevo.'
    } else if (error.message.includes('signup_disabled')) {
      errorMessage = 'El registro está temporalmente deshabilitado.'
    } else {
      errorMessage = 'Ocurrió un error inesperado. Inténtalo de nuevo.'
    }
    
    redirect(`/auth/login?message=${encodeURIComponent(errorMessage)}`)
  }

  // Verificar que el usuario esté confirmado
  if (data.user && !data.user.email_confirmed_at) {
    await supabase.auth.signOut()
    redirect(`/auth/login?message=${encodeURIComponent('Debes confirmar tu email antes de iniciar sesión. Revisa tu bandeja de entrada.')}`)
  }

  // Verificar que realmente tengamos un usuario válido
  if (!data.user || !data.session) {
    redirect(`/auth/login?message=${encodeURIComponent('Error al crear sesión. Inténtalo de nuevo.')}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard?sync=true')
}



export async function signUpWithEmail(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  // Validaciones del servidor
  if (!email || !password || !fullName) {
    redirect(`/auth/register?message=${encodeURIComponent('Todos los campos son requeridos')}`)
  }

  if (password.length < 6) {
    redirect(`/auth/register?message=${encodeURIComponent('La contraseña debe tener al menos 6 caracteres')}`)
  }

  if (fullName.trim().length < 2) {
    redirect(`/auth/register?message=${encodeURIComponent('El nombre debe tener al menos 2 caracteres')}`)
  }

  // Registrar directamente - Supabase maneja la verificación de email duplicado
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        full_name: fullName.trim(),
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard`
    }
  })

  if (error) {
    console.error('❌ Error de registro:', error)
    
    // Mensajes más específicos para errores de registro
    let errorMessage = 'Error al crear la cuenta'
    
    if (error.message.includes('User already registered')) {
      errorMessage = 'Este correo ya está registrado. ¿Ya tienes una cuenta? Inicia sesión en su lugar.'
    } else if (error.message.includes('signup_disabled')) {
      errorMessage = 'El registro está temporalmente deshabilitado. Inténtalo más tarde.'
    } else if (error.message.includes('Password should be at least 6 characters')) {
      errorMessage = 'La contraseña debe tener al menos 6 caracteres'
    } else if (error.message.includes('Invalid email')) {
      errorMessage = 'El formato del correo electrónico no es válido'
    } else if (error.message.includes('weak_password')) {
      errorMessage = 'La contraseña es muy débil. Usa una combinación de letras, números y símbolos.'
    } else if (error.message.includes('email_rate_limit_exceeded') || error.message.includes('over_email_send_rate_limit') || error.code === 'over_email_send_rate_limit') {
      // Extraer el tiempo de espera del mensaje si está disponible
      const waitTimeMatch = error.message.match(/(\d+)\s*seconds?/)
      const waitTime = waitTimeMatch ? waitTimeMatch[1] : '60'
      errorMessage = `Has intentado registrarte varias veces. Por seguridad, debes esperar ${waitTime} segundos antes de intentar de nuevo. Mientras tanto, verifica si ya tienes una cuenta e intenta iniciar sesión.`
    } else if (error.message.includes('For security purposes')) {
      // Manejar el mensaje específico que estás viendo
      const waitTimeMatch = error.message.match(/(\d+)\s*seconds?/)
      const waitTime = waitTimeMatch ? waitTimeMatch[1] : '60'
      errorMessage = `Por seguridad, debes esperar ${waitTime} segundos antes de intentar registrarte de nuevo. ¿Ya tienes una cuenta? Prueba iniciando sesión.`
    } else {
      errorMessage = 'Ocurrió un error inesperado. Inténtalo de nuevo.'
    }
    
    redirect(`/auth/register?message=${encodeURIComponent(errorMessage)}`)
  }

  // Verificar casos especiales de registro
  if (data.user && !data.user.email_confirmed_at && data.session) {
    // Usuario ya existía y se logueó automáticamente
    await supabase.auth.signOut()
    redirect(`/auth/register?message=${encodeURIComponent('Este correo ya está registrado. ¿Ya tienes una cuenta? Inicia sesión en su lugar.')}`)
  }

  if (!data.user) {
    console.error('❌ No se pudo crear el usuario')
    redirect(`/auth/register?message=${encodeURIComponent('Error al crear la cuenta. Inténtalo de nuevo.')}`)
  }

  // Redirigir a página de confirmación con el email
  redirect(`/auth/confirm?email=${encodeURIComponent(email)}`)
}

export async function signInWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    },
  })

  if (error) {
    console.error('❌ Error OAuth Google:', error)
    let errorMessage = 'Error al conectar con Google'
    
    if (error.message.includes('oauth_provider_not_supported')) {
      errorMessage = 'Google OAuth no está configurado correctamente'
    } else if (error.message.includes('signup_disabled')) {
      errorMessage = 'El registro está temporalmente deshabilitado'
    }
    
    redirect(`/auth/login?message=${encodeURIComponent(errorMessage)}`)
  }

  if (data.url) {
    redirect(data.url) // Redirigir a Google
  } else {
    redirect('/auth/login?message=Error inesperado con Google')
  }
}
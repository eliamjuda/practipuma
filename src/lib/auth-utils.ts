// /lib/auth-utils.ts
// Funciones auxiliares para validaciones de autenticación

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
  strength: 'weak' | 'fair' | 'good' | 'strong'
} {
  const errors: string[] = []
  
  if (password.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres')
  }
  
  if (password.length > 128) {
    errors.push('La contraseña no puede exceder 128 caracteres')
  }
  
  if (!/(?=.*[a-zA-Z])/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra')
  }
  
  // Calcular fuerza de la contraseña
  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak'
  
  if (password.length >= 6) {
    if (password.length >= 8 && /(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      if (/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
        strength = 'strong'
      } else {
        strength = 'good'
      }
    } else {
      strength = 'fair'
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength
  }
}

export function validateFullName(fullName: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  const trimmedName = fullName.trim()
  
  if (trimmedName.length < 3) {
    errors.push('El nombre debe tener al menos 3 caracteres')
  }
  
  if (trimmedName.length > 50) {
    errors.push('El nombre no puede exceder 50 caracteres')
  }
  
  if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(trimmedName)) {
    errors.push('El nombre solo puede contener letras y espacios')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function getPasswordStrengthColor(strength: 'weak' | 'fair' | 'good' | 'strong'): string {
  switch (strength) {
    case 'weak':
      return 'var(--red-secondary)'
    case 'fair':
      return 'var(--warning-orange-border)'
    case 'good':
      return 'var(--blue-main)'
    case 'strong':
      return 'var(--green-secondary)'
    default:
      return 'var(--shadow)'
  }
}

export function getPasswordStrengthText(strength: 'weak' | 'fair' | 'good' | 'strong'): string {
  switch (strength) {
    case 'weak':
      return 'Muy débil'
    case 'fair':
      return 'Débil'
    case 'good':
      return 'Buena'
    case 'strong':
      return 'Excelente'
    default:
      return ''
  }
}

// Función para obtener el proveedor de email basado en el dominio
export function getEmailProvider(email: string): { name: string; url: string } | null {
  const domain = email.split('@')[1]?.toLowerCase()
  
  const providers = {
    'gmail.com': { name: 'Gmail', url: 'https://mail.google.com' },
    'outlook.com': { name: 'Outlook', url: 'https://outlook.live.com' },
    'hotmail.com': { name: 'Outlook', url: 'https://outlook.live.com' },
    'yahoo.com': { name: 'Yahoo', url: 'https://mail.yahoo.com' },
    'yahoo.es': { name: 'Yahoo', url: 'https://mail.yahoo.com' },
    'icloud.com': { name: 'iCloud', url: 'https://www.icloud.com/mail' },
    'live.com': { name: 'Outlook', url: 'https://outlook.live.com' },
    'msn.com': { name: 'Outlook', url: 'https://outlook.live.com' },
  }

  return providers[domain as keyof typeof providers] || null
}

// Función para sanitizar datos de entrada
export function sanitizeInput(input: string): string {
  return input.trim().replace(/\s+/g, ' ')
}

// Función para generar mensajes de error amigables
export function getAuthErrorMessage(error: Error | { message?: string } | string | unknown): string {
  let message = ''
  
  if (typeof error === 'string') {
    message = error
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = (error as { message: string }).message || ''
  } else if (error instanceof Error) {
    message = error.message
  }
  
  const errorMappings: Record<string, string> = {
    'Invalid login credentials': 'Email o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo.',
    'Email not confirmed': 'Debes confirmar tu email antes de iniciar sesión. Revisa tu bandeja de entrada.',
    'User not found': 'No existe una cuenta con este email. ¿Te gustaría registrarte?',
    'User already registered': 'Este correo ya está registrado. ¿Ya tienes una cuenta? Inicia sesión en su lugar.',
    'too_many_requests': 'Demasiados intentos fallidos. Espera unos minutos antes de intentar de nuevo.',
    'signup_disabled': 'El registro está temporalmente deshabilitado.',
    'weak_password': 'La contraseña es muy débil. Usa una combinación de letras, números y símbolos.',
    'email_rate_limit_exceeded': 'Se ha enviado demasiados emails. Espera unos minutos antes de intentar de nuevo.',
    'Invalid email': 'El formato del correo electrónico no es válido',
    'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
    'email_already_confirmed': 'Este email ya ha sido confirmado. Puedes iniciar sesión directamente.',
    'oauth_provider_not_supported': 'Google OAuth no está configurado correctamente'
  }
  
  // Buscar coincidencias parciales
  for (const [key, value] of Object.entries(errorMappings)) {
    if (message.includes(key)) {
      return value
    }
  }
  
  return 'Ocurrió un error inesperado. Inténtalo de nuevo.'
}
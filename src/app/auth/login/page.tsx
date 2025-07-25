'use client'

import { createClient } from '@/utils/supabase/client'
import { signInWithEmail, signInWithGoogle } from "@/lib/auth-actions"
import { PageTransition } from "@/components/common/PageTransitions"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

interface FormData {
  email: string
  password: string
}

export default function LoginPage() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const router = useRouter()
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  // Verificar si el usuario ya está logueado
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        router.replace('/dashboard')
        return
      }
      
      setIsCheckingAuth(false)
    }
    
    checkAuth()
  }, [router])

  // Validar formulario
  useEffect(() => {
    const isValid = 
      isValidEmail(formData.email) &&
      formData.password.length >= 6 &&
      Object.keys(errors).length === 0

    setIsFormValid(isValid)
  }, [formData, errors])

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors }

    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'El correo electrónico es requerido'
        } else if (!isValidEmail(value)) {
          newErrors.email = 'Ingresa un correo electrónico válido'
        } else {
          delete newErrors.email
        }
        break

      case 'password':
        if (!value) {
          newErrors.password = 'La contraseña es requerida'
        } else if (value.length < 6) {
          newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
        } else {
          delete newErrors.password
        }
        break
    }

    setErrors(newErrors)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Limpiar errores generales al escribir
    if (errors.general) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.general
        return newErrors
      })
    }

    // Validar en tiempo real si ya hay un error
    if (errors[name as keyof FormErrors]) {
      validateField(name, value)
    }
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar todos los campos
    validateField('email', formData.email)
    validateField('password', formData.password)

    if (!isFormValid) {
      return
    }

    setIsLoading(true)
    setErrors({})
    
    try {
      const formDataObj = new FormData()
      formDataObj.append('email', formData.email.trim().toLowerCase())
      formDataObj.append('password', formData.password)
      
      await signInWithEmail(formDataObj)
    } catch (error) {
      console.error('Error en login:', error)
      setErrors(prev => ({
        ...prev,
        general: 'Ocurrió un error inesperado. Inténtalo de nuevo.'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const getInputClassName = (fieldName: keyof FormErrors, hasValue: boolean) => {
    const baseClass = "w-full px-4 py-3 border rounded-[var(--radius)] bg-[var(--principal-main-color)] text-[var(--text)] focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-[var(--text)] placeholder:opacity-50 transition-all duration-200"
    
    if (errors[fieldName]) {
      return `${baseClass} border-[var(--red-secondary)] focus:ring-[var(--red-secondary)]`
    }
    
    if (hasValue && !errors[fieldName]) {
      return `${baseClass} border-(--blue-main) focus:ring-[var(--blue-main)]`
    }
    
    return `${baseClass} border-[var(--shadow)] focus:ring-[var(--blue-main)]`
  }

  // Mostrar loading mientras verifica autenticación
  if (isCheckingAuth) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--blue-main)] border-t-transparent rounded-full"></div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Título y subtítulo */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[var(--text)]">
            ¡Volviste! 🥹
          </h1>
          <p className="text-[var(--text)] opacity-70">
            Bienvenido de vuelta a tu lugar especial
          </p>
        </div>

        {/* Botón de Google */}
        <form action={signInWithGoogle}>
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full bg-[var(--blue-main)] text-white py-3 px-4 rounded-[var(--radius)] 
                     font-medium hover:bg-[var(--blue-secondary)] transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--blue-main)]
                     flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </button>
        </form>

        {/* Separador */}
        <div className="relative text-center text-[var(--text)] opacity-50">
          <span className="bg-[var(--principal-main-color)] px-2">o</span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--shadow)]"></div>
          </div>
        </div>

        {/* Form de email */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--text)] mb-1"
            >
              Correo electrónico
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="tu@email.com"
                className={getInputClassName('email', !!formData.email)}
                required
                disabled={isLoading}
                autoComplete="email"
              />
              {formData.email && !errors.email && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-(--blue-main)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            {errors.email && (
              <p className="text-[var(--red-secondary)] text-sm mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--text)] mb-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="••••••••••••••"
                className={getInputClassName('password', !!formData.password)}
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text)] opacity-50 hover:opacity-70 transition-opacity"
                disabled={isLoading}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[var(--red-secondary)] text-sm mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

        {/* Mensaje de error general */}
        {(message || errors.general) && (
          <div className="bg-[var(--red-main)] border border-[var(--red-secondary)] text-[var(--back-red)] px-4 py-3 rounded-[var(--radius)] flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{message || errors.general}</span>
          </div>
        )}

          {/* Botón de login */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="cursor-pointer w-full bg-[var(--blue-main)] text-white py-3 px-4 rounded-[var(--radius)] 
                     font-medium hover:bg-[var(--blue-secondary)] transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)] focus:ring-offset-2
                     disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        {/* Enlaces adicionales */}
        <div className="space-y-4">
          {/* Enlace de registro */}
          <div className="text-center">
            <span className="text-[var(--text)] opacity-70">¿No tienes cuenta? </span>
            <Link href={"/auth/register"} className="text-[var(--blue-main)] hover:underline font-medium">
              Regístrate aquí
            </Link>
          </div>

        </div>
      </div>
    </PageTransition>
  )
}
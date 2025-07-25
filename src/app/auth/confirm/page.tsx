'use client'

import { PageTransition } from "@/components/common/PageTransitions"
import { getEmailProvider } from '@/lib/auth-utils'
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState<string>('')
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string>('')
  const [resendCount, setResendCount] = useState(0)
  const [canResend, setCanResend] = useState(true)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    const emailParam = searchParams.get('email')
    setEmail(emailParam || '')
  }, [searchParams])

  // Countdown para reenvío
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !canResend) {
      setCanResend(true)
    }
  }, [countdown, canResend])

  const handleResendEmail = async () => {
    if (!email || !canResend || isResending) return

    setIsResending(true)
    setResendMessage('')

    try {
      // Aquí llamarías a tu función para reenviar el email
      // const response = await resendConfirmationEmail(email)
      
      // Simulación de llamada API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setResendMessage('✅ Email de confirmación reenviado exitosamente')
      setResendCount(prev => prev + 1)
      setCanResend(false)
      setCountdown(60) // 60 segundos de espera
      
    } catch (error) {
      console.error('Error reenviando email:', error)
      setResendMessage('❌ Error al reenviar el email. Inténtalo de nuevo.')
    } finally {
      setIsResending(false)
    }
  }

  const emailProvider = email ? getEmailProvider(email) : null

  return (
    <PageTransition>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full p-8 text-center space-y-6">
          
          {/* Icono principal */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[var(--blue-main)] rounded-full flex items-center justify-center relative">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {/* Indicador de check */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[var(--green-secondary)] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Título y descripción */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-[var(--text)]">
              ¡Ya casi terminamos! 🎉
            </h1>
            <p className="text-[var(--text)] opacity-70 text-lg">
              Te hemos enviado un enlace de confirmación a
            </p>
            {email && (
              <div className="bg-[var(--principal-secondary-color)] rounded-[var(--radius)] p-4">
                <p className="font-semibold text-(--text) text-lg break-all">
                  {email}
                </p>
              </div>
            )}
          </div>

          {/* Instrucciones */}
          <div className="bg-[var(--blue-main)] bg-opacity-5 border border-[var(--blue-main)] border-opacity-20 rounded-[var(--radius)] p-4 space-y-3">
            <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--blue-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pasos a seguir:
            </h3>
            <ol className="text-sm text-[var(--text)] opacity-80 text-left space-y-2">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-[var(--blue-main)] text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Revisa tu bandeja de entrada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-[var(--blue-main)] text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Busca un email de PractiPuma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-[var(--blue-main)] text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Haz clic en &quot;<b>Confirmar email</b>&quot;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-[var(--blue-main)] text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>¡Comenzar a practicar! 🚀</span>
              </li>
            </ol>
          </div>

          {/* Botón directo al proveedor de email */}
          {emailProvider && (
            <div className="space-y-3">
              <p className="text-sm text-[var(--text)] opacity-60">
                O abre directamente tu email:
              </p>
              <a
                href={emailProvider.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--blue-main)] text-white px-6 py-3 rounded-[var(--radius)] 
                         font-medium hover:bg-[var(--blue-secondary)] transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)] focus:ring-offset-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Abrir {emailProvider.name}
              </a>
            </div>
          )}

          {/* Reenviar email */}
          <div className="space-y-3">
            {resendMessage && (
              <div className={`p-3 rounded-[var(--radius)] text-sm ${
                resendMessage.includes('✅') 
                  ? 'bg-[var(--green-main)] border border-[var(--green-secondary)] text-[var(--back-green)]'
                  : 'bg-[var(--red-main)] border border-[var(--red-secondary)] text-[var(--back-red)]'
              }`}>
                {resendMessage}
              </div>
            )}
            
            <div className="text-center">
              <p className="text-sm text-[var(--text)] opacity-70 mb-2">
                ¿No recibiste el email?
              </p>
              <button
                onClick={handleResendEmail}
                disabled={!canResend || isResending || !email}
                className="text-[var(--blue-main)] hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
              >
                {isResending ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-[var(--blue-main)] border-t-transparent rounded-full"></div>
                    Reenviando...
                  </span>
                ) : !canResend ? (
                  `Reenviar en ${countdown}s`
                ) : (
                  `Reenviar email${resendCount > 0 ? ` (${resendCount})` : ''}`
                )}
              </button>
            </div>
          </div>

          {/* Enlaces de navegación */}
          <div className="space-y-3 pt-4 border-t border-[var(--shadow)]">
            <Link
              href="/auth/login"
              className="block w-full bg-(--blue-main) text-[var(--text)] p-3 rounded-[var(--radius)] 
                       hover:bg-(--blue-secondary) hover:bg-opacity-20 transition-colors font-medium"
            >
              Ir a Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
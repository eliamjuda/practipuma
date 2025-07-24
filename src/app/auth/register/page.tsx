import { signUpWithEmail, signInWithGoogle } from '@/lib/auth-actions'
import { PageTransition } from '@/components/common/PageTransitions'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
    const supabase = await createClient()
    const params = await searchParams // ← Await aquí

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      redirect('/dashboard')
    }
  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Título y subtítulo */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[var(--text)]">
            Únete a PractiPuma
          </h1>
          <p className="text-[var(--text)] opacity-70">
            Comienza tu preparación para ingresar a la UNAM hoy mismo
          </p>
        </div>

        {/* Mensaje de error/éxito */}
        {params?.message && (
          <div className="bg-[var(--green-main)] border border-[var(--green-secondary)] text-[var(--back-green)] px-4 py-3 rounded-[var(--radius)]">
            {params.message}
          </div>
        )}

        {/* Botón de Google */}
        <form action={signInWithGoogle}>
          <button
            type="submit"
            className="curspor-pointer w-full bg-(--blue-main) text-white py-3 px-4 rounded-[var(--radius)] 
                     font-medium hover:bg-(--blue-secondary) transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-offset-2
                     flex items-center justify-center gap-2"
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
            Registrarse con Google
          </button>
        </form>

        {/* Separador */}
        <div className="relative text-center text-[var(--text)] opacity-50">
          <span className="bg-[var(--principal-main-color)] px-2">o</span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--shadow)]"></div>
          </div>
        </div>

        {/* Form de registro */}
        <form action={signUpWithEmail} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[var(--text)] mb-1">
              Nombre completo
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Tu nombre completo"
              className="cursor-pointer w-full px-4 py-3 border border-[var(--shadow)] rounded-[var(--radius)] 
                       bg-[var(--principal-main-color)] text-[var(--text)] 
                       focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)] focus:border-transparent
                       placeholder:text-[var(--text)] placeholder:opacity-50"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text)] mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-3 border border-[var(--shadow)] rounded-[var(--radius)] 
                       bg-[var(--principal-main-color)] text-[var(--text)] 
                       focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)] focus:border-transparent
                       placeholder:text-[var(--text)] placeholder:opacity-50"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--text)] mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-[var(--shadow)] rounded-[var(--radius)] 
                       bg-[var(--principal-main-color)] text-[var(--text)] 
                       focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)] focus:border-transparent
                       placeholder:text-[var(--text)] placeholder:opacity-50"
              required
              minLength={6}
            />
            <p className="text-xs text-[var(--text)] opacity-50 mt-1">Mínimo 6 caracteres</p>
          </div>
          
          <button
            type="submit"
            className="cursor-pointer w-full bg-(--blue-main) text-white py-3 px-4 rounded-[var(--radius)] 
                     font-medium hover:bg-(--blue-secondary) transition-colors duration-200
                     focus:outline-none "
          >
            Crear Cuenta
          </button>
        </form>

        {/* Sign in link */}
        <div className="text-center">
          <span className="text-[var(--text)] opacity-70">¿Ya tienes cuenta? </span>
          <Link href={"/auth/login"} className="text-[var(--blue-main)] hover:underline font-medium">
            Inicia sesión aquí
          </Link>
        </div>

        {/* Términos y condiciones */}
        <p className="text-xs text-[var(--text)] opacity-50 text-center">
          Al registrarte, aceptas nuestros términos y condiciones de uso.
        </p>
      </div>
    </PageTransition>
  )
}
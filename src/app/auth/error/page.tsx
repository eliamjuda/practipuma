export const runtime = 'edge';
import Link from "next/link"

export default async function AuthCodeErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams 
  const errorMessage = params?.error

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error de Autenticación</h1>
          <p className="text-gray-600 mb-4">
            Hubo un problema al procesar tu autenticación con Google.
          </p>
          
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-700">
                <strong>Error:</strong> {decodeURIComponent(errorMessage)}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <a
            href="/auth/login"
            className="block w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver a intentar
          </a>
          
          <Link
            href="/"
            className="block w-full bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Ir al inicio
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p className="mb-2">Posibles soluciones:</p>
          <ul className="text-left space-y-1">
            <li>• Asegúrate de permitir cookies en tu navegador</li>
            <li>• Intenta con modo incógnito</li>
            <li>• Verifica que tengas una conexión estable</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
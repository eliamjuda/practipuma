import { PageTransition } from "@/components/common/PageTransitions";
import Link from "next/link";

export default async function ConfirmEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  const email = params?.email;

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-lg shadow-md text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-(--blue-main) rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
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
            </div>
            <h1 className="text-2xl font-bold text-(--text) mb-2">
              Confirma tu email
            </h1>
            <p className="text-gray-600">
              Te hemos enviado un enlace de confirmación a:
            </p>
            {email && (
              <p className="font-semibold text-blue-600 mt-2">{email}</p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Revisa tu bandeja de entrada</strong> y haz clic en el
              enlace de confirmación para activar tu cuenta.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="block w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ir a Iniciar Sesión
            </Link>

            <Link
              href="/"
              className="block w-full bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>

          <div className="mt-8 text-xs text-gray-500">
            <p className="mb-2">¿No recibiste el email?</p>
            <ul className="text-left space-y-1">
              <li>• Revisa tu carpeta de spam</li>
              <li>• Asegúrate de que el email esté escrito correctamente</li>
              <li>• El enlace expira en 24 horas</li>
            </ul>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex md:py-10 md:pl-8  bg-[var(--principal-main-color)]">
      {/* Lado izquierdo - Formulario */}
      <div className="w-full lg:w-1/2 order-2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[var(--blue-main)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PP</span>
            </div>
            <span className="text-xl font-bold text-[var(--text)]">PractiPuma</span>
          </div>

          {/* Contenido dinámico de cada página */}
          {children}
        </div>
      </div>

      {/* Lado derecho - Ilustración */}
      <div className="hidden lg:flex rounded-lg lg:w-1/2 bg-gradient-to-br from-(--blue-secondary) to-(--blue-main) items-center justify-center p-12">
        <div className="relative w-full h-full max-w-lg">
          <AuthIllustration />
        </div>
      </div>
    </div>
  );
}

// Ilustración común para ambas páginas
function AuthIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      
      {/* Elemento central - Libro/Examen */}
      <div className="relative z-10">
        <div className="w-48 h-64 bg-gradient-to-b from-blue-400 to-(--blue-main) rounded-2xl shadow-2xl relative overflow-hidden transform rotate-[-6deg]">
          {/* Pantalla del examen */}
          <div className="absolute inset-4 bg-white/10 rounded-xl backdrop-blur-sm">
            {/* Título del examen */}
            <div className="p-4 text-center">
              <div className="text-white/90 font-bold text-sm mb-2">EXAMEN UNAM</div>
              <div className="text-white/70 text-xs">Área 1 - Físico Matemáticas</div>
            </div>
            
            {/* Preguntas simuladas */}
            <div className="px-4 space-y-2">
              <div className="w-full bg-white/20 rounded h-2"></div>
              <div className="w-3/4 bg-white/15 rounded h-2"></div>
              <div className="w-full bg-white/20 rounded h-2"></div>
              <div className="w-2/3 bg-white/15 rounded h-2"></div>
            </div>
            
            {/* Opciones múltiples */}
            <div className="px-4 mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border border-white/40 rounded-full"></div>
                <div className="w-16 bg-white/20 rounded h-1.5"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="w-20 bg-white/20 rounded h-1.5"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border border-white/40 rounded-full"></div>
                <div className="w-14 bg-white/20 rounded h-1.5"></div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
}
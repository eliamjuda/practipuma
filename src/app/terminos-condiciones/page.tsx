import React from 'react';

const TerminosCondiciones = () => {
  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-8 my-12">

        <div className="prose max-w-none">
          <h1 className='text-4xl font-bold mb-8'>Términos y Condiciones</h1>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              1. Aceptación de los Términos
            </h2>
            <p className="leading-relaxed mb-4">
              Al acceder y utilizar la plataforma PractiPuma (en adelante &quot;la Plataforma&quot;), usted acepta estar legalmente obligado por estos Términos y Condiciones de Uso (en adelante &quot;los Términos&quot;). Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestros servicios.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Descripción del Servicio</h2>
            <p className=" leading-relaxed mb-4">
              PractiPuma es una plataforma educativa digital diseñada para ayudar a los aspirantes a prepararse para el examen de admisión de la Universidad Nacional Autónoma de México (UNAM). Ofrecemos:
            </p>
            
            <h3 className="text-lg font-semibold mb-3">2.1 Servicios Incluidos</h3>
            <ul className="list-disc pl-6 mb-4 ">
              <li>Distintos modos de práctica</li>
              <li>Exámenes simulacro por áreas (Área 1, 2, 3 y 4)</li>
              <li>Banco de preguntas similares a las del examen oficial</li>
              <li>Aprendizaje personalizado</li>
              <li>Materiales de estudio complementarios</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">2.2 Modalidades de Servicio</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Plan Gratuito</strong>: Acceso limitado a funciones básicas</li>
              <li><strong>Plan Pro</strong>: Acceso completo a todas las funcionalidades premium</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Registro y Cuenta de Usuario</h2>
            
            <h3 className="text-lg font-semibold mb-3">3.1 Requisitos de Registro</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Ser mayor de 13 años o contar con autorización parental</li>
              <li>Proporcionar información veraz y actualizada</li>
              <li>Mantener la confidencialidad de sus credenciales de acceso</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">3.2 Responsabilidades del Usuario</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Es responsable de todas las actividades realizadas bajo su cuenta</li>
              <li>Debe notificar inmediatamente cualquier uso no autorizado</li>
              <li>Debe mantener actualizados sus datos de contacto</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">3.3 Suspensión y Terminación</h3>
            <p className="leading-relaxed">
              Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos de uso, proporcionen información falsa, realicen actividades fraudulentas o ilegales, o interfieran con el funcionamiento normal de la plataforma.
            </p>
          </section>

          <section className="mb-8 bg-(--principal-secondary-color) p-6 rounded-lg border border-(--shadow)">
            <h2 className="text-2xl font-bold mb-4">4. Suscripciones y Pagos</h2>
            
            <h3 className="text-lg font-semibold mb-3">4.1 Planes de Suscripción</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-(--principal-main-color) p-4 rounded-lg border">
                <h4 className="font-semibold">Plan Semanal Pro</h4>
                <p className="text-2xl font-bold">$25 MXN <span className="text-sm font-normal">por semana</span></p>
              </div>
              <div className="bg-(--principal-main-color) p-4 rounded-lg border">
                <h4 className="font-semibold">Plan Mensual Pro</h4>
                <p className="text-2xl font-bold">$65 MXN <span className="text-sm font-normal">por mes</span></p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-3">4.2 Procesamiento de Pagos</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Los pagos se procesan a través de Stripe</li>
              <li>Las tarifas se cobran por adelantado</li>
              <li>Los precios incluyen impuestos aplicables</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">4.3 Renovación Automática</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Las suscripciones se renuevan automáticamente</li>
              <li>Puede cancelar en cualquier momento desde su cuenta</li>
              <li>La cancelación es efectiva al final del período de facturación actual</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Uso Aceptable</h2>
            
            <h3 className="text-lg font-semibold mb-3">5.1 Usos Permitidos</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Estudio personal para preparación del examen UNAM</li>
              <li>Práctica individual con los materiales proporcionados</li>
              <li>Seguimiento de progreso académico personal</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">5.2 Usos Prohibidos</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Compartir credenciales de acceso con terceros</li>
              <li>Reproducir, distribuir o vender contenido de la plataforma</li>
              <li>Utilizar herramientas automatizadas para extraer contenido</li>
              <li>Intentar acceder a áreas restringidas del sistema</li>
              <li>Crear múltiples cuentas para evadir limitaciones</li>
              <li>Utilizar el servicio para fines comerciales sin autorización</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              6. Propiedad Intelectual
            </h2>
            <p className="leading-relaxed mb-4">
              Todos los materiales, incluyendo pero no limitado a preguntas y respuestas, explicaciones y contenido educativo, diseño y funcionalidad de la plataforma, logotipos y marcas comerciales, son propiedad exclusiva de PractiPuma o sus licenciantes.
            </p>
            <p className="leading-relaxed">
              Se otorga una licencia limitada, no exclusiva y no transferible para acceder y utilizar la plataforma para fines educativos personales y descargar materiales únicamente para uso offline personal.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Limitación de Responsabilidad</h2>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
              <p className="text-yellow-800">
                <strong>Importante:</strong> PractiPuma es una herramienta de apoyo educativo. No garantizamos resultados específicos en exámenes oficiales ni aprobación en el examen de admisión UNAM.
              </p>
            </div>
            <p className="leading-relaxed">
              Nuestra responsabilidad se limita al monto pagado por el usuario en los últimos 12 meses. No seremos responsables por daños indirectos, incidentales o consecuenciales, pérdida de datos o información, interrupciones del servicio por causas ajenas a nuestro control, o decisiones tomadas basándose en nuestro contenido.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Modificaciones a los Términos</h2>
            <p className=" leading-relaxed mb-4">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados mediante publicación en la plataforma, envío de correo electrónico, y notificaciones dentro de la aplicación.
            </p>
            <p className=" leading-relaxed">
              El uso continuado después de los cambios constituye aceptación de los nuevos términos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Ley Aplicable y Jurisdicción</h2>
            <p className=" leading-relaxed">
              Estos términos se rigen por las leyes de México. Cualquier disputa será resuelta en los tribunales competentes de Ciudad de México, México. Alentamos la resolución amigable de disputas antes de proceder legalmente.
            </p>
          </section>
        </div>

        {/* Contact Section */}
        <div className="bg-(--principal-secondary-color) p-6 rounded-lg border-(--shadow) border-1 mt-8">
          <h3 className="text-lg font-semibold mb-4">📞 Contacto</h3>
          <p className=" mb-2">Para preguntas sobre estos términos:</p>
          <ul className=" space-y-1">
            <li><strong>Email:</strong> practipuma@gmail.com</li>
          </ul>
        </div>

      </main>
    </div>
  );
};

export default TerminosCondiciones;
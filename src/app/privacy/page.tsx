import React from 'react';

const PoliticaPrivacidad = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12 mt-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Política de Privacidad</h1>
          <p className="text-lg">Última actualización: 28 de julio de 2025</p>
        </div>

        <div className="prose max-w-none">
          
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">1. Introducción</h2>
            <p className="mb-4">
              En PractiPuma valoramos y respetamos su privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos su información personal cuando utiliza nuestra plataforma educativa.
            </p>
            <div className=" p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Responsable del Tratamiento:</h3>
              <p>Domicilio: Magdalena de las Salinas, 07760 Mexico City, CDMX</p>
              <p>Email de contacto: practipuma@gmail.com</p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">2. Información que Recopilamos</h2>
            
            <h3 className="text-xl font-semibold mb-4">2.1 Información que Usted Proporciona Directamente</h3>
            
            <h4 className="text-lg font-semibold mb-3">Datos de Registro:</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Fecha de nacimiento</li>
              <li>Área de estudio de interés (Área 1, 2, 3 o 4)</li>
              <li>Contraseña (almacenada de forma encriptada)</li>
            </ul>

            <h4 className="text-lg font-semibold mb-3">Datos de Perfil:</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Preferencias de estudio</li>
              <li>Objetivos académicos</li>
              <li>Información de contacto adicional</li>
            </ul>

            <h4 className="text-lg font-semibold mb-3">Información de Facturación:</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Datos necesarios para procesar pagos</li>
              <li>Historial de transacciones</li>
              <li>Información de facturación fiscal</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">2.2 Información Recopilada Automáticamente</h3>
            
            <h4 className="text-lg font-semibold mb-3">Datos de Uso de la Plataforma:</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Tiempo dedicado a cada sesión de estudio</li>
              <li>Preguntas respondidas y resultados obtenidos</li>
              <li>Progreso en diferentes materias y subtemas</li>
              <li>Frecuencia de uso de la plataforma</li>
              <li>Patrones de estudio y rendimiento académico</li>
            </ul>

            <h4 className="text-lg font-semibold mb-3">Información Técnica:</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Tipo y versión del navegador</li>
              <li>Resolución de pantalla</li>
              <li>Datos de cookies y tecnologías similares</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">3. Cómo Utilizamos su Información</h2>
            
            <h3 className="text-xl font-semibold mb-4">3.1 Prestación del Servicio</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Crear y mantener su cuenta de usuario</li>
              <li>Personalizar su experiencia de aprendizaje</li>
              <li>Generar exámenes simulacro adaptados a su área</li>
              <li>Proporcionar retroalimentación sobre su rendimiento</li>
              <li>Recomendar áreas de mejora</li>
              <li>Registrar su avance en diferentes materias</li>
              <li>Generar estadísticas de rendimiento</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">3.2 Mejora del Servicio</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Analizar patrones de uso para mejorar la plataforma</li>
              <li>Identificar problemas técnicos y resolverlos</li>
              <li>Desarrollar nuevas funcionalidades</li>
              <li>Optimizar la experiencia del usuario</li>
              <li>Investigación educativa agregada y anonimizada</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">3.3 Comunicación con el Usuario</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Confirmaciones de registro y cambios de cuenta</li>
              <li>Notificaciones sobre su progreso y logros</li>
              <li>Alertas sobre nuevas funcionalidades</li>
              <li>Recordatorios de estudio personalizados</li>
              <li>Información sobre planes premium</li>
              <li>Newsletter educativo (con opción de cancelar suscripción)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">3.4 Procesamiento de Pagos</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Procesar pagos de suscripciones</li>
              <li>Gestionar renovaciones automáticas</li>
              <li>Emitir facturas y recibos</li>
              <li>Manejar reembolsos cuando corresponda</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">4. Compartición de Información</h2>
            
            <div className=" p-4 rounded-lg mb-6">
              <p className="font-semibold">No vendemos, alquilamos ni comercializamos su información personal a terceros.</p>
            </div>

            <h3 className="text-xl font-semibold mb-4">4.1 Proveedores de Servicios</h3>
            <p className="mb-4">Compartimos información mínima necesaria con:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Supabase:</strong> Almacenamiento de base de datos</li>
              <li><strong>Cloudflare:</strong> Hosting y distribución de contenido</li>
              <li><strong>Stripe:</strong> Procesamiento seguro de pagos y facturación</li>
              <li><strong>Proveedores de email:</strong> Para envío de notificaciones</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">4.2 Circunstancias Especiales</h3>
            <p className="mb-4">Podemos compartir información en casos de:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Órdenes judiciales válidas</li>
              <li>Investigaciones gubernamentales legítimas</li>
              <li>Cumplimiento de leyes aplicables</li>
              <li>Prevenir fraudes o actividades ilegales</li>
              <li>Proteger la seguridad de usuarios</li>
              <li>Defender nuestros derechos legales</li>
            </ul>
          </section>

          {/* Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">5. Seguridad de los Datos</h2>
            
            <h3 className="text-xl font-semibold mb-4">5.1 Medidas Técnicas</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Transmisión de datos mediante HTTPS/SSL</li>
              <li>Protección de datos sensibles en base de datos</li>
              <li>Logs de auditoría para acciones administrativas</li>
              <li>Servidores en centros de datos certificados</li>
              <li>Respaldos automáticos y encriptados</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">5.2 Medidas Organizacionales</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Capacitación regular del personal en privacidad y seguridad</li>
              <li>Acuerdos de confidencialidad</li>
              <li>Procedimientos claros de manejo de datos</li>
              <li>Procedimientos de respuesta a incidentes</li>
              <li>Revisiones periódicas de seguridad</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">6. Retención de Datos</h2>
            
            <h3 className="text-xl font-semibold mb-4">6.1 Criterios de Retención</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Datos de cuenta activa:</strong> Mientras la cuenta permanezca activa y durante el período de suscripción</li>
              <li><strong>Datos de progreso académico:</strong> Se conservan hasta 6 meses después de la inactividad de la cuenta</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">6.2 Eliminación de Datos</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Los usuarios pueden solicitar eliminación de su cuenta</li>
              <li>El proceso de eliminación toma hasta 30 días</li>
              <li>Algunos datos pueden conservarse por obligaciones legales</li>
              <li>Datos temporales se eliminan automáticamente</li>
              <li>Logs técnicos se eliminan después de 12 meses</li>
            </ul>
          </section>

          {/* User Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">7. Sus Derechos de Privacidad</h2>
            
            <h3 className="text-xl font-semibold mb-4">7.1 Derechos Disponibles</h3>
            
            <h4 className="text-lg font-semibold mb-3">Derecho de Acceso</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Solicitar una copia de sus datos personales</li>
              <li>Información sobre cómo se procesan sus datos</li>
              <li>Respuesta en un plazo máximo de 30 días</li>
            </ul>

            <h4 className="text-lg font-semibold mb-3">Derecho de Rectificación</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Corregir datos inexactos o incompletos</li>
              <li>Actualizar información desactualizada</li>
              <li>Modificar preferencias de perfil</li>
            </ul>

            <h4 className="text-lg font-semibold mb-3">Derecho de Eliminación</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Solicitar eliminación de sus datos personales</li>
              <li>Aplicable cuando ya no necesitemos los datos</li>
              <li>Sujeto a obligaciones legales de retención</li>
            </ul>

            <h4 className="text-lg font-semibold mb-3">Derecho de Portabilidad</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Recibir sus datos en formato estructurado</li>
              <li>Transferir datos a otro servicio</li>
              <li>Disponible para datos proporcionados directamente</li>
            </ul>

            <h4 className="text-lg font-semibold mb-3">Derecho de Oposición</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Oponerse al procesamiento para marketing directo</li>
              <li>Oponerse al procesamiento basado en interés legítimo</li>
              <li>Opciones de opt-out disponibles</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">7.2 Cómo Ejercer sus Derechos</h3>
            <p className="mb-4">Puede ejercer sus derechos contactándonos en:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Email: practipuma@gmail.com</li>
              <li>Formulario en la plataforma</li>
              <li>Configuraciones de cuenta para algunos derechos</li>
            </ul>
            <p>Responderemos en un plazo máximo de 30 días sin costo para el usuario. Se requiere verificación de identidad.</p>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">8. Cookies y Tecnologías Similares</h2>
            
            <h3 className="text-xl font-semibold mb-4">8.1 Tipos de Cookies que Utilizamos</h3>
            
            <h4 className="text-lg font-semibold mb-3">Cookies Esenciales</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Necesarias para el funcionamiento básico</li>
              <li>Gestión de sesiones de usuario</li>
              <li>Seguridad y autenticación</li>
            </ul>

            <h4 className="text-lg font-semibold mb-3">Cookies de Rendimiento</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Análisis de uso de la plataforma</li>
              <li>Optimización de velocidad de carga</li>
              <li>Identificación de errores técnicos</li>
            </ul>

            <h4 className="text-lg font-semibold mb-3">Cookies de Funcionalidad</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Recordar preferencias del usuario</li>
              <li>Personalización de interfaz</li>
              <li>Configuraciones de idioma</li>
            </ul>

            <h4 className="text-lg font-semibold mb-3">Cookies de Marketing</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Solo con su consentimiento</li>
              <li>Personalización de anuncios</li>
              <li>Medición de efectividad</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">8.2 Gestión de Cookies</h3>
            <p className="mb-4">Usted puede controlar las cookies mediante:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Panel de preferencias de cookies en nuestra plataforma</li>
              <li>Configuración de su navegador</li>
              <li>Opt-out disponible para cookies no esenciales</li>
            </ul>
          </section>

          {/* International Transfers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">9. Transferencias Internacionales</h2>
            <p className="mb-4">
              Los datos primarios se almacenan en México. Algunos servicios pueden procesar datos en otros países, pero solo en países con protecciones adecuadas y con las siguientes salvaguardas:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Cláusulas contractuales estándar</li>
              <li>Certificaciones de privacidad de proveedores</li>
              <li>Acuerdos de transferencia de datos</li>
            </ul>
          </section>

          {/* Minors */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">10. Menores de Edad</h2>
            <p className="mb-4">
              Nuestro servicio está destinado a personas de 13 años o más. Los menores de 18 años requieren consentimiento parental. 
              Implementamos protecciones especiales para menores:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>No recopilamos datos innecesarios de menores</li>
              <li>Controles parentales disponibles</li>
              <li>Proceso especial para ejercicio de derechos</li>
              <li>Verificación de edad durante el registro</li>
            </ul>
          </section>

          {/* Changes to Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">11. Cambios a esta Política</h2>
            <p className="mb-4">
              Nos reservamos el derecho de modificar esta política. Los cambios importantes serán notificados mediante:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Email a usuarios registrados</li>
              <li>Publicación prominente en la plataforma</li>
              <li>Período de 30 días antes de implementación</li>
            </ul>
            <p>Las versiones anteriores están disponibles bajo solicitud con registro de cambios significativos.</p>
          </section>

          {/* Contact and Complaints */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">12. Contacto y Quejas</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-(--principal-secondary-color) border-2 border-(--shadow) p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Oficial de Privacidad</h3>
                <p><strong>Email:</strong> practipuma@gmail.com</p>
                <br />
              </div>
              
              <div className="bg-(--principal-secondary-color) border-2 border-(--shadow) p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Autoridad de Supervisión en México</h3>
                <p><strong>INAI</strong></p>
                <p>Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales</p>
                <p><strong>Teléfono:</strong> 55 5004 2400</p>
                <p><strong>Sitio web:</strong> www.home.inai.org.mx</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Proceso de Quejas:</h3>
              <ul className="list-disc pl-6">
                <li>Respuesta inicial en 5 días hábiles</li>
                <li>Investigación completa en 30 días</li>
                <li>Escalación a autoridades si es necesario</li>
              </ul>
            </div>
          </section>

          {/* Final Provisions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">13. Disposiciones Finales</h2>
            <p className="mb-4">
              Esta política complementa nuestros Términos y Condiciones y tiene validez legal completa. 
              Se rige por las leyes de México, incluyendo la Ley Federal de Protección de Datos Personales en Posesión de Particulares.
            </p>
            <p className="mb-4">
              En caso de conflicto entre versiones en diferentes idiomas, prevalece la versión en español.
            </p>
            
            <div className="bg-(--principal-secondary-color) border-2 border-(--shadow) p-4 rounded-lg">
              <p className="font-semibold">Compromiso de PractiPuma:</p>
              <p>
                Nos comprometemos a proteger su privacidad y mantener la transparencia sobre nuestras prácticas de datos. 
                Su confianza es fundamental para nuestra misión educativa.
              </p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="mb-2">
            <strong>Para consultas específicas sobre privacidad, no dude en contactarnos en practipuma@gmail.com</strong>
          </p>
          <p className="text-sm">
            Esta Política de Privacidad fue actualizada por última vez el 28 de julio de 2025.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
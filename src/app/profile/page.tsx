'use client';

import React from 'react';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  User as UserIcon, 
  Mail, 
  Calendar,
  AlertTriangle
} from 'lucide-react';
import Image from 'next/image';

const ProfilePage = () => {
  const { user, displayName, avatarUrl, isLoading } = useUser();

  const mockMembership = {
    isPremium: true,
    plan: 'Premium Mensual',
    expirationDate: '2024-12-31',
    status: 'Activa'
  };

  const mockPaymentHistory = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 65.00,
      description: 'Premium Semanal',
      status: 'Completado'
    },
    {
      id: '2', 
      date: '2023-01-15',
      amount: 25.00,
      description: 'Premium Mensual',
      status: 'Completado'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-(--principal-main-color) flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-(--blue-main) border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--principal-main-color) mt-12 md:mt-24 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Mi Perfil
          </h1>
          <p className="text-(--text-secondary)">
            Gestiona tu suscripcion y tu cuenta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información Personal */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-(--card-bg) rounded-2xl shadow-md p-6 border border-(--shadow)">
              <div className="text-center">
                {/* Foto de Perfil */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {avatarUrl ? (
                    <Image
                    width={100}
                    height={100}
                      src={avatarUrl}
                      alt="Foto de perfil"
                      className="w-full h-full rounded-full object-cover border-4 border-(--blue-main)"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-(--blue-main) to-(--blue-secondary) flex items-center justify-center border-4 border-(--blue-main)">
                      <UserIcon className="w-10 h-10 text-white" />
                    </div>
                  )}
                </div>

                {/* Información Básica */}
                <h2 className="text-xl font-semibold mb-1">{displayName}</h2>
                <div className="flex items-center justify-center text-(--text-secondary) mb-4">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{user?.email}</span>
                </div>

                {/* Estado de Membresía */}
                {mockMembership.isPremium ? (
                  <div className="inline-flex items-center bg-gradient-to-r from-(--premium-color-2) to-(--premium-color-1) text-white px-4 py-2 rounded-full text-sm font-semibold">
                    🔥 Premium
                  </div>
                ) : (
                  <div className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm">
                    Plan Gratuito
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detalles de la Cuenta */}
          <div className="lg:col-span-2 space-y-6">
            {/* Membresía */}
            <div className="bg-white dark:bg-(--card-bg) rounded-2xl shadow-md p-6 border border-(--shadow)">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                Suscripción
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-(--text-secondary) mb-1">Plan Actual</p>
                  <p className="font-semibold">{mockMembership.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-(--text-secondary) mb-1">Estado</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-(--green-main) text-(--green-secondary) border-1 border-(--green-secondary)">
                    {mockMembership.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-(--text-secondary) mb-1">Fecha de Vencimiento</p>
                  <p className="font-semibold flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {mockMembership.expirationDate}
                  </p>
                </div>
              </div>

              <div className="border-t border-(--shadow) pt-4">
                <Button className="w-full md:w-auto bg-(--red-main) border-2 border-(--red-secondary) text-(--text) cursor-pointer hover:bg-(--red-secondary)">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Cancelar Membresía
                </Button>
              </div>
            </div>

            {/* Historial de Pagos */}
            <div className="bg-white dark:bg-(--card-bg) rounded-2xl shadow-md p-6 border border-(--shadow)">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-(--blue-main)" />
                Historial de Pagos
              </h3>

              {mockPaymentHistory.length > 0 ? (
                <div className="space-y-3">
                  {mockPaymentHistory.map((payment) => (
                    <div 
                      key={payment.id}
                      className="flex items-center justify-between p-4 bg-(--principal-secondary-color) border-1 border-(--shadow) rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-sm text-(--text-secondary)">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${payment.amount.toFixed(2)} MXN</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-(--green-main) text-(--green-secondary) border-1 border-(--green-secondary)">
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-(--text-secondary)">No hay historial de pagos disponible</p>
                  <p className="text-sm text-(--text-secondary) mt-2">
                    Los pagos aparecerán aquí una vez que realices tu primera compra
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
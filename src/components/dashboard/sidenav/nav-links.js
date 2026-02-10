'use client';

import { useAuth } from '@/context/authContext';
import {
  UserGroupIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
  ChartBarSquareIcon,
  ClipboardDocumentListIcon,
  CheckBadgeIcon,
  IdentificationIcon,
  BanknotesIcon,
  DocumentCurrencyDollarIcon,
  ClipboardDocumentCheckIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  CalendarDaysIcon,
  ArchiveBoxIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const { usuario, loading, logout } = useAuth();
  const pathname = usePathname();

  if (loading || !usuario) return null;

  const links = [
    {
      name: 'Clientes',
      href: '/CRM/dashboard/customers',
      icon: UsersIcon,
      roles: ['SUPER_ADMIN', 'ADMIN', 'COORDINADOR', 'ASESOR'],
    },
    {
      name: 'Asesores',
      href: '/CRM/dashboard/advisors',
      icon: UserGroupIcon,
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      name: 'Pre-Aprobados',
      href: '/CRM/dashboard/preApproved',
      icon: ClipboardDocumentListIcon,
      roles: ['SUPER_ADMIN', 'ADMIN', 'COORDINADOR'],
    },
    {
      name: 'Aprobados',
      href: '/CRM/dashboard/approved',
      icon: CheckBadgeIcon,
      roles: ['SUPER_ADMIN', 'ADMIN', 'AUXILIAR', 'COORDINADOR', 'ASESOR'],
    },
    {
      name: 'Entregados',
      href: '/CRM/dashboard/delivered',
      icon: ClipboardDocumentCheckIcon,
      roles: ['SUPER_ADMIN', 'ADMIN', 'COORDINADOR', 'ASESOR'],
    },
    {
      name: 'Estadísticas',
      href: '/CRM/dashboard/stadistics',
      icon: ChartBarSquareIcon,
      roles: ['SUPER_ADMIN', 'ADMIN', 'COORDINADOR'],
    },
    {
      name: 'Pagos',
      href: '/CRM/dashboard/payments',
      icon: BanknotesIcon,
      roles: ['SUPER_ADMIN', 'AUXILIAR'],
    },
    {
      name: 'Facturación',
      href: '/CRM/dashboard/invoices',
      icon: DocumentCurrencyDollarIcon,
      roles: ['SUPER_ADMIN', 'AUXILIAR'],
    },
    {
      name: 'Matrículas',
      href: '/CRM/dashboard/registrations',
      icon: IdentificationIcon,
      roles: ['SUPER_ADMIN', 'AUXILIAR'],
    },
    /* {
      name: 'Base General',
      href: '/CRM/dashboard/generalBase',
      icon: BuildingStorefrontIcon,
      roles: ['SUPER_ADMIN', 'ADMIN', 'COORDINADOR', 'AUXILIAR'],
    },
    {
      name: 'Gestión de Créditos',
      href: '/CRM/dashboard/creditManagement',
      icon: ShieldCheckIcon,
      roles: ['SUPER_ADMIN', 'EJECUTIVO_FINANCIERO'],
    },
    {
      name: 'Moto para Entrega',
      href: '/CRM/dashboard/motoForDelivery',
      icon: TruckIcon,
      roles: ['SUPER_ADMIN', 'EJECUTIVO_FINANCIERO'],
    },
    {
      name: 'Motos Agendadas',
      href: '/CRM/dashboard/motorcyclesScheduled',
      icon: CalendarDaysIcon,
      roles: ['SUPER_ADMIN', 'COORDINADOR_DE_ENTREGA'],
    },
    {
      name: 'Bodega Pre-Aprobados',
      href: '/CRM/dashboard/preApprovedWarehouse',
      icon: ArchiveBoxIcon,
      roles: ['SUPER_ADMIN'],
    },
    {
      name: 'Bodega Aprobados',
      href: '/CRM/dashboard/approvedWarehouse',
      icon: ArchiveBoxIcon,
      roles: ['SUPER_ADMIN'],
    }, */
  ];

  return (
    <nav className="flex flex-col gap-1 text-sm">
      {links
        .filter((link) => link.roles.includes(usuario.role))
        .map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                ${
                  isActive
                    ? 'bg-sky-100 text-sky-900 font-semibold'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-sky-500" />
              )}

              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg
                  ${
                    isActive
                      ? 'bg-sky-200 text-sky-700'
                      : 'bg-gray-800 text-gray-400 group-hover:text-white'
                  }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <span className="truncate">{link.name}</span>
            </Link>
          );
        })}

      <div className="my-4 border-t border-gray-700" />

      <button
        onClick={logout}
        className="group flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-500 cursor-pointer"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 group-hover:bg-red-500/20">
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
        </div>
        <span>Cerrar Sesión</span>
      </button>
    </nav>
  );
}

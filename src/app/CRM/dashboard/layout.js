'use client';

import SideNavigation from '@/components/dashboard/sidenav/sidenav';
import RoleGuard from '@/components/auth/roleGuard';

export default function Layout({ children }) {
  return (
    <RoleGuard allowedRoles={['Administrador', 'Asesor']}>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNavigation />
        </div>
        <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    </RoleGuard>
  );
}

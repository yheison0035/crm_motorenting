'use client';

import { useEffect, useState } from 'react';
import SideNavigation from '@/components/dashboard/sidenav/sidenav';
import RoleGuard from '@/auth/roleGuard';
import AlertMotivation from '@/components/dashboard/modals/alertMotivation';
import { useAuth } from '@/context/authContext';
import { Roles } from '@/config/roles';

export default function Layout({ children }) {
  const [showMotivation, setShowMotivation] = useState(false);
  const { usuario } = useAuth();

  useEffect(() => {
    if (usuario) {
      const hasSeen = localStorage.getItem('hasSeenMotivation');
      if (!hasSeen) {
        setShowMotivation(true);
        localStorage.setItem('hasSeenMotivation', 'true');
      }
    }
  }, [usuario]);

  return (
    <RoleGuard allowedRoles={Object.values(Roles)}>
      <div className="relative flex h-screen overflow-hidden bg-gray-100">
        <SideNavigation />

        <main className="flex-1 overflow-y-auto p-6 md:p-10 pt-13">
          {children}
        </main>
      </div>

      {showMotivation && (
        <AlertMotivation onClose={() => setShowMotivation(false)} />
      )}
    </RoleGuard>
  );
}

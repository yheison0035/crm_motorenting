'use client';

import { useState, useEffect, useCallback } from 'react';
import { redirect, useParams } from 'next/navigation';
import useUsers from '@/lib/api/hooks/useUsers';
import AdvisorForm from '@/components/dashboard/form/advisorForm';
import AlertModal from '@/components/dashboard/modals/alertModal';

export default function EditAdvisor() {
  const { getUserById, updateUser, loading } = useUsers();
  const { id } = useParams();
  const [advisor, setAdvisor] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '', url: '' });

  const fetchAdvisor = useCallback(async () => {
    try {
      const { data } = await getUserById(Number(id));
      setAdvisor(data);
    } catch (err) {
      setAlert({
        type: 'warning',
        message: err.message || 'No tienes permisos',
        url: '/CRM/dashboard/advisors',
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchAdvisor();
  }, [id, fetchAdvisor]);

  if (!advisor)
    return (
      <AlertModal
        type={alert.type}
        message={alert.message}
        onClose={() => redirect('/CRM/dashboard/advisors')}
        url={alert.url}
      />
    );

  if (!advisor) return <p className="text-center mt-10">Cargando asesor...</p>;

  return (
    <>
      <AdvisorForm
        mode="edit"
        loading={loading}
        initialData={advisor}
        onSubmit={(data) => updateUser(Number(id), data)}
      />
    </>
  );
}

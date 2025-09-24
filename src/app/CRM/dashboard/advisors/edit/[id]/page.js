'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useUsers from '@/lib/api/hooks/useUsers';
import AdvisorForm from '@/components/dashboard/form/advisorForm';

export default function EditAdvisor() {
  const { getUserById, updateUser, loading } = useUsers();
  const { id } = useParams();
  const [advisor, setAdvisor] = useState(null);

  const fetchAdvisor = async () => {
    try {
      const { data } = await getUserById(Number(id));
      setAdvisor(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) fetchAdvisor();
  }, [id]);

  if (!advisor) return <p className="text-center mt-10">Cargando asesor...</p>;

  return (
    <AdvisorForm
      mode="edit"
      loading={loading}
      initialData={advisor}
      onSubmit={(data) => updateUser(Number(id), data)}
    />
  );
}

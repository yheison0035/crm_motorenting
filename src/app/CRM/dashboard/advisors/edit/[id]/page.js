'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import BtnReturn from '@/components/dashboard/buttons/return';
import BtnSave from '@/components/dashboard/buttons/save';
import { advisors } from '@/api/advisors';

export default function EditAdvisor() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [advisor, setAdvisor] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const advisorSuccefull = advisors.find((c) => c.id === parseInt(id));
      if (advisorSuccefull) {
        setAdvisor(advisorSuccefull);
      } else {
        alert('Asesor no encontrado');
        router.push('/CRM/dashboard/advisors');
      }
    }
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdvisor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('Datos actualizados:', advisor);

    setTimeout(() => {
      setLoading(false);
      alert('Asesor actualizado correctamente');
      router.push('/CRM/dashboard/advisors');
    }, 1000);
  };

  if (!advisor) return <p className="text-center mt-10">Cargando asesor...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Editar Asesor
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ['name', 'Nombre'],
          ['email', 'Correo', 'email'],
          ['phone', 'Teléfono'],
          ['address', 'Dirección'],
          ['city', 'Ciudad'],
          ['document', 'Documento'],
        ].map(([name, label, type = 'text']) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={advisor[name] || ''}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              required={name === 'nombre' || name === 'correo'}
            />
          </div>
        ))}

        <div className="flex justify-end mt-4">
          <BtnReturn route={'/CRM/dashboard/advisors'} />
          <BtnSave />
        </div>
      </form>
    </div>
  );
}

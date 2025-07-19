'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const advisor = [
  {
    id: 1,
    nombre: 'Laura Pérez',
    correo: 'laura.perez@empresa.com',
    telefono: '3101234567',
    direccion: 'Calle 123',
    ciudad: 'Bogotá',
    documento: '123456789',
  },
  {
    id: 2,
    nombre: 'Carlos Gómez',
    correo: 'carlos.gomez@empresa.com',
    telefono: '3129876543',
    direccion: 'Calle 123',
    ciudad: 'Bogotá',
    documento: '123456789',
  },
  {
    id: 3,
    nombre: 'Ana Torres',
    correo: 'ana.torres@empresa.com',
    telefono: '3006543210',
    direccion: 'Calle 123',
    ciudad: 'Bogotá',
    documento: '123456789',
  },
];

export default function EditAdvisor() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const clienteEncontrado = advisor.find((c) => c.id === parseInt(id));
      if (clienteEncontrado) {
        setCustomer(clienteEncontrado);
      } else {
        alert('Cliente no encontrado');
        router.push('/CRM/dashboard/advisors');
      }
    }
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('Datos actualizados:', customer);

    setTimeout(() => {
      setLoading(false);
      alert('Cliente actualizado correctamente');
      router.push('/CRM/dashboard/customers');
    }, 1000);
  };

  if (!customer)
    return <p className="text-center mt-10">Cargando cliente...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Editar Cliente
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ['nombre', 'Nombre'],
          ['correo', 'Correo', 'email'],
          ['telefono', 'Teléfono'],
          ['direccion', 'Dirección'],
          ['ciudad', 'Ciudad'],
          ['documento', 'Documento'],
        ].map(([name, label, type = 'text']) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={customer[name] || ''}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={name === 'nombre' || name === 'correo'}
            />
          </div>
        ))}

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}

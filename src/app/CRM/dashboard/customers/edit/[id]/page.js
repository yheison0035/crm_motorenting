'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import BtnReturn from '@/components/dashboard/buttons/return';
import BtnSave from '@/components/dashboard/buttons/save';
import { customers } from '@/api/customers';
import { stateCustomer } from '@/api/stateCustomer';
import CommentsHistory from '@/components/dashboard/comments/history';

export default function EditCustomer() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (id) {
      const clienteEncontrado = customers.find((c) => c.id === parseInt(id));
      if (clienteEncontrado) {
        setCustomer(clienteEncontrado);
      } else {
        alert('Cliente no encontrado');
        router.push('/CRM/dashboard/customers');
      }
    }
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const date = new Date().toISOString().split('T')[0];
    setCustomer((prev) => ({
      ...prev,
      comments: [
        ...(prev.comments || []),
        { date, description: newComment.trim() },
      ],
    }));
    setNewComment('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('Datos enviados:', {
      ...customer,
    });

    setTimeout(() => {
      setLoading(false);
      alert('Cliente actualizado correctamente');
      router.push('/CRM/dashboard/customers');
    }, 1000);
  };

  if (!customer)
    return <p className="text-center mt-10">Cargando cliente...</p>;

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Editar Cliente
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                value={customer[name] || ''}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required={name === 'name' || name === 'email'}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              name="state"
              value={customer.state}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Seleccione un estado</option>
              {stateCustomer.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Agregar comentario
          </label>
          <div className="flex gap-2 mt-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="2"
              placeholder="Escriba un comentario..."
            />
            <button
              type="button"
              onClick={handleAddComment}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Agregar
            </button>
          </div>
        </div>
        <CommentsHistory customer={customer} />
        <div className="flex justify-end mt-4 gap-2">
          <BtnReturn route="/CRM/dashboard/customers" />
          <BtnSave disabled={loading} />
        </div>
      </form>
    </div>
  );
}

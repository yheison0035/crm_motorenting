'use client';
import React, { useState } from 'react';
import AlertModal from '../../modals/alertModal';
import useCustomers from '@/lib/api/hooks/useCustomers';
import useMotoForDelivery from '@/lib/api/hooks/useMotoForDelivery';

export default function Decline({ data, onClose, view }) {
  const [observation, setObservation] = useState('');
  const [touched, setTouched] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '', url: '' });

  const { addComment } = useCustomers();
  const { updateDeliveryStatus } = useMotoForDelivery();

  const handleAddComment = async () => {
    setTouched(true);
    if (!observation.trim()) return;
    try {
      if (view === 'preApproved') {
        await addComment(Number(data.id), observation.trim(), 'RECHAZADO');
      } else if (view === 'motorcyclesScheduled') {
        await addComment(Number(data.id), observation.trim());
        await updateDeliveryStatus(data.id, 'RECHAZADO');
      } else {
        return;
      }

      setObservation('');
      setAlert({
        type: 'success',
        message: 'Cliente rechazado correctamente.',
      });
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.message || 'Error al agregar comentario',
      });
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">Motivo del rechazo</h2>

      <textarea
        className={`w-full border rounded-xl px-4 py-2 text-sm shadow-sm focus:outline-none transition 
          focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
          ${
            touched && !observation.trim()
              ? 'border-red-500'
              : 'border-gray-200'
          }
        `}
        rows={5}
        placeholder="Escribe aquí la observación..."
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
        onBlur={() => setTouched(true)}
        required
      />

      {touched && !observation.trim() && (
        <p className="text-sm text-red-600">Este campo es obligatorio.</p>
      )}

      <button
        onClick={handleAddComment}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
      >
        Guardar Rechazo
      </button>

      <AlertModal
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: '', message: '' }, onClose(true))}
        url={alert.url}
      />
    </div>
  );
}

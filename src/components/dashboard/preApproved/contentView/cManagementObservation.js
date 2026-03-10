'use client';
import React, { useState } from 'react';
import AlertModal from '../../modals/alertModal';
import { mapActionToStatus } from '@/lib/api/utils/utils';
import useCreditManagement from '@/lib/api/hooks/useCreditManagement';
import useCustomers from '@/lib/api/hooks/useCustomers';
import useMotoForDelivery from '@/lib/api/hooks/useMotoForDelivery';

export default function CManagementObservation({ data, onClose, view }) {
  const [observation, setObservation] = useState('');
  const [touched, setTouched] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '', url: '' });

  const { updateCreditStatus } = useCreditManagement();
  const { updateMotoForDeliveryStatus } = useMotoForDelivery();
  const { addComment, updateCustomerWarehouseRestore } = useCustomers();

  const handleAddComment = async () => {
    setTouched(true);
    if (!observation.trim()) return;
    try {
      await addComment(Number(data.id), observation.trim());
      if (view === 'creditManagement') {
        await updateCreditStatus(data.id, mapActionToStatus(data.action));
      } else if (view === 'motoForDelivery') {
        await updateMotoForDeliveryStatus(
          data.id,
          mapActionToStatus(data.action)
        );
      } else if (view === 'customerWarehouse') {
        await updateCustomerWarehouseRestore(data.id);
      } else {
        return;
      }

      setObservation('');

      if (view === 'customerWarehouse') {
        setAlert({
          type: 'success',
          message: 'Cliente restaurado correctamente.',
        });
      } else {
        setAlert({
          type: 'success',
          message:
            'Se añadio la observación y se actualizo el estado correctamente.',
        });
      }
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.message || 'Error al agregar observación',
      });
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">Motivo de {data.action}</h2>

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
        className={` text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer 
          ${data.action === 'Aprobar' && 'bg-green-600 hover:bg-green-700'}
          ${data.action === 'Rechazar' && 'bg-red-600 hover:bg-red-700'}
          ${data.action === 'En Curso' && 'bg-blue-600 hover:bg-blue-700'}
          ${data.action === 'Restaurar' && 'bg-green-600 hover:bg-green-700'}`}
      >
        Guardar observación
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

'use client';

import { useState } from 'react';
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import useApproved from '@/lib/api/hooks/useApproved';

export default function ApprovedScheduled({ data, onClose }) {
  const [form, setForm] = useState({
    date: '',
    time: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    date: '',
    time: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const { createScheduleDelivery } = useApproved();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {
      date: form.date ? '' : 'La fecha es obligatoria.',
      time: form.time ? '' : 'La hora es obligatoria.',
      address: form.address.trim() ? '' : 'La dirección es obligatoria.',
    };

    setErrors(newErrors);

    return !newErrors.date && !newErrors.time && !newErrors.address;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await createScheduleDelivery(data.id, {
        scheduledDate: form.date,
        scheduledTime: form.time,
        address: form.address,
      });

      onClose(true);
    } catch (error) {
      console.error(error);
      alert('Error al agendar la entrega');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Programar Entrega
        </h2>
        <p className="text-sm text-gray-500">
          Configure la fecha, hora y dirección de entrega del cliente.
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <CalendarDaysIcon className="w-4 h-4 text-orange-500" />
              Fecha agendada
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className={`w-full border rounded-xl p-3 text-sm bg-white
              focus:ring-2 focus:ring-orange-500 outline-none transition
              ${errors.date ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.date && (
              <p className="text-xs text-red-500">{errors.date}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <ClockIcon className="w-4 h-4 text-blue-500" />
              Hora agendada
            </label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className={`w-full border rounded-xl p-3 text-sm bg-white
              focus:ring-2 focus:ring-orange-500 outline-none transition
              ${errors.time ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.time && (
              <p className="text-xs text-red-500">{errors.time}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <MapPinIcon className="w-4 h-4 text-purple-500" />
            Dirección de entrega
          </label>
          <textarea
            rows={3}
            value={form.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Ingrese la dirección completa..."
            className={`w-full border rounded-xl p-3 text-sm bg-white resize-none
            focus:ring-2 focus:ring-orange-500 outline-none transition
            ${errors.address ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.address && (
            <p className="text-xs text-red-500">{errors.address}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center gap-2
          px-6 py-2.5 text-sm font-semibold rounded-xl
          bg-orange-500 text-white hover:bg-orange-600
          transition shadow-md disabled:opacity-60 cursor-pointer"
        >
          <CheckCircleIcon className="w-5 h-5" />
          {loading ? 'Guardando...' : 'Guardar Programación'}
        </button>
      </div>
    </div>
  );
}

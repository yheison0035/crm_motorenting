'use client';

import { useState } from 'react';
import {
  CalendarIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import useGeneralBase from '@/lib/api/hooks/useGeneralBase';

export default function GeneralBasePage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { exportGeneralBase } = useGeneralBase();

  const statuses = [
    { id: 'APROBADO', label: 'Aprobados' },
    { id: 'ENTREGADO', label: 'Entregados' },
  ];

  const toggleStatus = (id) => {
    setSelectedStatuses((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleExport = async () => {
    if (!startDate || !endDate || !selectedStatuses.length) {
      setError('Debe completar todos los filtros.');
      return;
    }

    if (startDate > endDate) {
      setError('La fecha inicial no puede ser mayor a la fecha final.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const payload = {
        startDate,
        endDate,
        statuses: selectedStatuses,
      };

      await exportGeneralBase(payload);
    } catch (err) {
      setError('Error al exportar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-4">
        <div className="bg-orange-100 p-4 rounded-2xl">
          <ArrowDownTrayIcon className="w-7 h-7 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Base General</h1>
          <p className="text-gray-500 text-sm">
            Exportación avanzada de registros del CRM
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-300 p-6 md:p-8 grid md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-blue-500" />
            Fecha Inicial
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-sm bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-green-500" />
            Fecha Final
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-sm bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none transition"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FunnelIcon className="w-4 h-4 text-purple-500" />
            Estados
          </label>

          <div className="space-y-2">
            {statuses.map((status) => (
              <button
                key={status.id}
                type="button"
                onClick={() => toggleStatus(status.id)}
                className={`w-full flex justify-between items-center px-4 py-2 rounded-xl border text-sm transition cursor-pointer
                  ${
                    selectedStatuses.includes(status.id)
                      ? 'bg-purple-50 border-purple-500 text-purple-700'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
              >
                {status.label}
                {selectedStatuses.includes(status.id) && (
                  <CheckCircleIcon className="w-4 h-4 text-purple-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleExport}
            disabled={loading}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 
                px-5 py-2.5 text-sm font-semibold rounded-xl
                bg-orange-500 text-white 
                hover:bg-orange-600 
                transition-all duration-200 
                shadow-md hover:shadow-lg 
                disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            {loading ? 'Exportando...' : 'Exportar Excel'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}
    </div>
  );
}

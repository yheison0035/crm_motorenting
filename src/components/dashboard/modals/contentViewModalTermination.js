'use client';

import { useState } from 'react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { addComment } from '@/lib/api/customers';
import { formatPesosRealtime, pesosToNumber } from '@/lib/api/utils/utils';
import CommentsManager from '../comments/commentsManager';
import AlertModal from './alertModal';
import useCustomers from '@/lib/api/hooks/useCustomers';

export default function ContentViewModalTermination({ data, onClose }) {
  const [type, setType] = useState('CLAUSULA');
  const [value, setValue] = useState('');
  const [comment, setComment] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '', url: '' });

  const { finalizeCustomer } = useCustomers();

  if (!data) return null;

  const handleSubmit = async () => {
    try {
      const payload = {
        status: type,
      };

      if (type === 'CLAUSULA') {
        payload.value = pesosToNumber(value);
      }

      await finalizeCustomer(data.id, payload);

      if (comment.trim()) {
        await addComment(data.id, comment.trim());
      }

      setAlert({
        type: 'success',
        message: 'Cliente finalizado correctamente',
      });
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.message || 'Error al finalizar cliente',
      });
    }
  };

  const isFormValid = () => {
    if (type === 'CLAUSULA') {
      return pesosToNumber(value) > 0 && comment.trim().length > 0;
    }

    if (type === 'DESISTE') {
      return comment.trim().length > 0;
    }

    return false;
  };

  const isValid = isFormValid();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={() => onClose()} />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 animate-fadeIn z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Finalizar cliente
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition cursor-pointer"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setType('CLAUSULA')}
            className={`rounded-xl border px-4 py-3 text-sm font-medium transition cursor-pointer ${
              type === 'CLAUSULA'
                ? 'bg-orange-600 text-white border-orange-600'
                : 'border-gray-200 hover:border-orange-600'
            }`}
          >
            CLAUSULA
          </button>

          <button
            onClick={() => setType('DESISTE')}
            className={`rounded-xl border px-4 py-3 text-sm font-medium transition cursor-pointer ${
              type === 'DESISTE'
                ? 'bg-orange-600 text-white border-orange-600'
                : 'border-gray-200 hover:border-orange-600'
            }`}
          >
            DESISTE
          </button>
        </div>

        {type === 'CLAUSULA' && (
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Valor cláusula
              </label>

              <input
                value={formatPesosRealtime(value)}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ingrese valor"
                className="
                  w-full border border-gray-200
                  rounded-xl px-4 py-2 text-sm
                  focus:ring-2 focus:ring-orange-500
                  focus:border-orange-500
                  transition focus:outline-none
                "
              />
            </div>

            <CommentsManager
              value={comment}
              onChange={setComment}
              label="Observación"
            />
          </div>
        )}

        {type === 'DESISTE' && (
          <div className="space-y-4">
            <CommentsManager
              value={comment}
              onChange={setComment}
              label="Motivo del desistimiento"
            />
          </div>
        )}

        <div className="flex justify-end mt-8 pt-4 border-t border-gray-100">
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`
                inline-flex items-center gap-2
                px-5 py-2
                rounded-xl
                font-medium
                border
                transition
                ${
                  isValid
                    ? 'bg-orange-600 text-white border-orange-600 hover:bg-white hover:text-orange-600 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                }
              `}
          >
            <CheckCircleIcon className="w-5 h-5" />
            Finalizar Cliente
          </button>
        </div>
      </div>

      <AlertModal
        type={alert.type}
        message={alert.message}
        onClose={() =>
          setAlert({ type: '', message: '', url: '' }, onClose(true))
        }
        url={alert.url}
      />
    </div>
  );
}

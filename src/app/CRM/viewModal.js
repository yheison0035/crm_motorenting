'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';

export default function ViewModal({ customer, onClose }) {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Detalles del Cliente
          </h2>
          <p className="text-sm text-gray-500">
            Información completa del cliente
          </p>
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <p className="font-semibold">Nombre:</p>
            <p>{customer.nombre}</p>
          </div>
          <div>
            <p className="font-semibold">Correo:</p>
            <p>{customer.correo}</p>
          </div>
          <div>
            <p className="font-semibold">Teléfono:</p>
            <p>{customer.telefono}</p>
          </div>
          <div>
            <p className="font-semibold">Dirección:</p>
            <p>{customer.direccion || 'No disponible'}</p>
          </div>
          <div>
            <p className="font-semibold">Ciudad:</p>
            <p>{customer.ciudad || 'No disponible'}</p>
          </div>
          <div>
            <p className="font-semibold">Documento:</p>
            <p>{customer.documento || 'No disponible'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

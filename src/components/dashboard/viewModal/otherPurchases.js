import { formatPesosRealtime } from '@/lib/api/utils/utils';
import React from 'react';

export default function OtherPurchases({ otherPurchases }) {
  return (
    <details className="group border rounded-xl p-4 border-gray-200">
      <summary className="cursor-pointer font-semibold text-gray-800 text-lg flex justify-between items-center">
        Otras Compras
        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          ▼
        </span>
      </summary>

      {otherPurchases?.length > 0 ? (
        <div className="space-y-4 mt-4">
          {otherPurchases.map((vehicle, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl">
              <p>
                <strong>Descripcion:</strong> {vehicle.description}
              </p>
              <p>
                <strong>Valor:</strong> {formatPesosRealtime(vehicle.value)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-3">No hay otras compras registradas</p>
      )}
    </details>
  );
}

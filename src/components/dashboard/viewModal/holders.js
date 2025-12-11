import { formatEnumText } from '@/lib/api/utils/utils';
import React from 'react';

export default function Holders({ holders }) {
  return (
    <details className="group border rounded-xl p-4 border-gray-200">
      <summary className="cursor-pointer font-semibold text-gray-800 text-lg flex justify-between items-center">
        Titulares
        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          ▼
        </span>
      </summary>

      {holders?.length > 0 ? (
        <div className="space-y-4 mt-4">
          {holders.map((h, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl">
              <p>
                <strong>Nombre:</strong> {h.fullName}
              </p>
              <p>
                <strong>Documento:</strong> {h.document}
              </p>
              <p>
                <strong>Email:</strong> {h.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {h.phone}
              </p>
              <p>
                <strong>Ciudad:</strong> {h.city}
              </p>
              <p>
                <strong>Entidad Financiera:</strong>{' '}
                {formatEnumText(h.financialEntity, 'uppercase')}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-3">No hay titulares</p>
      )}
    </details>
  );
}

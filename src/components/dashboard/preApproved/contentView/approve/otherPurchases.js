import { formatPesosRealtime, pesosToNumber } from '@/lib/api/utils/utils';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function OtherPurchases({
  addOtherPurchases,
  removeOtherPurchases,
  otherPurchases,
  errors,
  setOtherPurchases,
}) {
  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Otras Compras</h2>
        <p
          onClick={addOtherPurchases}
          className="
            flex items-center gap-2
            text-orange-700 hover:bg-orange-700 hover:text-white border
            border-orange-700  
            font-medium
            px-4 py-2
            rounded-xl
            shadow-md hover:shadow-lg
            transition-all duration-300
            active:scale-95 cursor-pointer
          "
        >
          <PlusIcon className="w-5 h-5" />
          Agregar otra compra
        </p>
      </div>

      {otherPurchases.map((vehicle, i) => (
        <div
          key={i}
          className="relative border border-gray-200 p-4 pr-8 rounded mb-4 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <button
            type="button"
            onClick={() => removeOtherPurchases(i)}
            className="absolute top-3 right-1 text-red-500 hover:text-red-700 cursor-pointer"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-500">
              Descripcion
            </label>
            <input
              placeholder="Ej: Casco"
              value={vehicle.description}
              onChange={(e) => {
                const copy = [...otherPurchases];
                copy[i].description = e.target.value;
                setOtherPurchases(copy);
              }}
              className={`w-full px-4 py-2 rounded-xl border text-sm shadow-sm
                focus:outline-none focus:ring-2 transition ${
                  errors[`otherPurchases-${i}-description`]
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                }`}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-500">Valor</label>
            <input
              value={formatPesosRealtime(vehicle.value)}
              onChange={(e) => {
                const copy = [...otherPurchases];
                copy[i].value = pesosToNumber(e.target.value);
                setOtherPurchases(copy);
              }}
              className={`
                w-full px-4 py-2 rounded-xl border text-sm shadow-sm
                focus:outline-none focus:ring-2 transition
                ${
                  errors[`otherPurchases-${i}-value`]
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                }
              `}
              placeholder="0"
            />
          </div>
        </div>
      ))}
    </section>
  );
}

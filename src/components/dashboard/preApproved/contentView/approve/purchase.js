import { formatPesosRealtime, pesosToNumber } from '@/lib/api/utils/utils';
import React from 'react';

export default function Purchase({ purchase, errors, setPurchase }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Datos de la compra</h2>

      <div className="border border-gray-200 p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Marca"
          value={purchase.brand}
          onChange={(e) => setPurchase({ ...purchase, brand: e.target.value })}
          className={`w-full px-4 py-2 rounded-xl border text-sm shadow-sm
                focus:outline-none focus:ring-2 transition ${
                  errors.brand
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                }`}
        />

        <input
          placeholder="Referencia"
          value={purchase.reference}
          onChange={(e) =>
            setPurchase({ ...purchase, reference: e.target.value })
          }
          className={`w-full px-4 py-2 rounded-xl border text-sm shadow-sm
                focus:outline-none focus:ring-2 transition ${
                  errors.reference
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                }`}
        />

        <input
          placeholder="Color principal"
          value={purchase.mainColor}
          onChange={(e) =>
            setPurchase({ ...purchase, mainColor: e.target.value })
          }
          className={`w-full px-4 py-2 rounded-xl border text-sm shadow-sm
                focus:outline-none focus:ring-2 transition ${
                  errors.mainColor
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                }`}
        />

        <input
          placeholder="Color opcional"
          value={purchase.optionalColor}
          onChange={(e) =>
            setPurchase({ ...purchase, optionalColor: e.target.value })
          }
          className={`w-full px-4 py-2 rounded-xl border text-sm shadow-sm
                focus:outline-none focus:ring-2 transition ${
                  errors.optionalColor
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                }`}
        />

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-500">
            Valor comercial
          </label>
          <input
            value={formatPesosRealtime(purchase.commercialValue)}
            onChange={(e) =>
              setPurchase({
                ...purchase,
                commercialValue: pesosToNumber(e.target.value),
              })
            }
            className={`
                w-full px-4 py-2 rounded-xl border text-sm shadow-sm
                focus:outline-none focus:ring-2 transition
                ${
                  errors.commercialValue
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                }
              `}
            placeholder="0"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-500">
            Valor trámites
          </label>
          <input
            value={formatPesosRealtime(purchase.processValue)}
            onChange={(e) =>
              setPurchase({
                ...purchase,
                processValue: pesosToNumber(e.target.value),
              })
            }
            className={` w-full px-4 py-2 rounded-xl border text-sm shadow-sm
                focus:outline-none focus:ring-2 transition ${
                  errors.processValue
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                }`}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-500">
            Total compra
          </label>
          <input
            value={formatPesosRealtime(purchase.totalValue)}
            readOnly
            className="w-full border border-gray-200 bg-gray-100 rounded-xl px-4 py-2 text-sm shadow-sm cursor-not-allowed"
          />
        </div>
      </div>
    </section>
  );
}

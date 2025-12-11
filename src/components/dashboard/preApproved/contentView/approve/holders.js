import { FINANCIALS_LIST } from '@/lib/api/listData/financials';
import { formatEnumText } from '@/lib/api/utils/utils';
import { PlusIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function Holders({ addHolder, holders, setHolders }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Datos de titulares</h2>
        <button
          onClick={addHolder}
          className="
            flex items-center gap-2
            text-blue-700 hover:bg-blue-700 hover:text-white border
            border-blue-700  
            font-medium
            px-4 py-2
            rounded-xl
            shadow-md hover:shadow-lg
            transition-all duration-300
            active:scale-95 cursor-pointer
          "
        >
          <PlusIcon className="w-5 h-5" />
          Agregar titular
        </button>
      </div>

      {holders.map((holder, i) => (
        <div
          key={i}
          className="border border-gray-200 p-4 rounded mb-4 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            placeholder="Nombres completos"
            onChange={(e) => {
              const copy = [...holders];
              copy[i].fullName = e.target.value;
              setHolders(copy);
            }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm"
          />

          <input
            placeholder="Cédula"
            onChange={(e) => {
              const copy = [...holders];
              copy[i].document = e.target.value;
              setHolders(copy);
            }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm"
          />

          <input
            placeholder="Correo"
            onChange={(e) => {
              const copy = [...holders];
              copy[i].email = e.target.value;
              setHolders(copy);
            }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm"
          />

          <input
            placeholder="Teléfono"
            onChange={(e) => {
              const copy = [...holders];
              copy[i].phone = e.target.value;
              setHolders(copy);
            }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm"
          />

          <input
            placeholder="Dirección"
            onChange={(e) => {
              const copy = [...holders];
              copy[i].address = e.target.value;
              setHolders(copy);
            }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm"
          />

          <input
            placeholder="Ciudad"
            onChange={(e) => {
              const copy = [...holders];
              copy[i].city = e.target.value;
              setHolders(copy);
            }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm"
          />

          <select
            onChange={(e) => {
              const copy = [...holders];
              copy[i].financialEntity = e.target.value;
              setHolders(copy);
            }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm"
          >
            <option value="">Financiera</option>
            {FINANCIALS_LIST.map((f) => (
              <option key={f} value={f}>
                {formatEnumText(f, 'uppercase')}
              </option>
            ))}
          </select>
        </div>
      ))}
    </section>
  );
}

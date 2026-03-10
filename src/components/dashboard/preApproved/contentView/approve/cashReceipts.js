import {
  formatToInputDate,
  formatPesosRealtime,
  pesosToNumber,
} from '@/lib/api/utils/utils';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function CashReceipts({
  addReceipt,
  removeReceipt,
  errors,
  receipts,
  setReceipts,
}) {
  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Recibos de caja</h2>
        <p
          onClick={addReceipt}
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
          Agregar recibo
        </p>
      </div>

      {receipts.map((r, i) => (
        <div
          key={i}
          className="relative border border-gray-200 p-4 pr-8 rounded mb-4 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <button
            type="button"
            onClick={() => removeReceipt(i)}
            className="absolute top-3 right-1 text-red-500 hover:text-red-700 cursor-pointer"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
          <input
            value={r.receiptNumber}
            placeholder="Número de recibo"
            onChange={(e) => {
              const copy = [...receipts];
              copy[i].receiptNumber = e.target.value;
              setReceipts(copy);
            }}
            className={`w-full px-4 py-2 rounded-xl border text-sm shadow-sm
                focus:outline-none focus:ring-2 transition ${
                  errors[`receipt-${i}-receiptNumber`]
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                }`}
          />

          <input
            value={formatToInputDate(r.date)}
            type="date"
            onChange={(e) => {
              const copy = [...receipts];
              copy[i].date = e.target.value;
              setReceipts(copy);
            }}
            className={`w-full px-4 py-2 rounded-xl border text-sm shadow-sm
                focus:outline-none focus:ring-2 transition ${
                  errors[`receipt-${i}-date`]
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                }`}
          />

          <input
            placeholder="Valor"
            value={formatPesosRealtime(r.amount)}
            onChange={(e) => {
              const copy = [...receipts];
              copy[i].amount = pesosToNumber(e.target.value);
              setReceipts(copy);
            }}
            className={`w-full px-4 py-2 rounded-xl border text-sm shadow-sm
                focus:outline-none focus:ring-2 transition ${
                  errors[`receipt-${i}-amount`]
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                }`}
          />
        </div>
      ))}
    </section>
  );
}

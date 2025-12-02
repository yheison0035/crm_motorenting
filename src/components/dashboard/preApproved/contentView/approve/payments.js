import { PlusIcon } from '@heroicons/react/24/outline';
import { FINANCIALS_LIST } from '@/lib/api/listData/financials';
import { formatPesosRealtime, pesosToNumber } from '@/lib/api/utils/utils';

export default function Payments({ addPayment, payments, setPayments }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Datos de pagos</h2>

        <button
          onClick={addPayment}
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
          Agregar pago
        </button>
      </div>

      {payments.map((p, i) => (
        <div
          key={i}
          className="border border-gray-200 p-4 rounded mb-4 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <select
            onChange={(e) => {
              const copy = [...payments];
              copy[i].financial = e.target.value;
              setPayments(copy);
            }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm"
          >
            <option value="">Financiera</option>
            {FINANCIALS_LIST.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>

          <input
            placeholder="Total pago"
            value={formatPesosRealtime(p.total)}
            onChange={(e) => {
              const copy = [...payments];
              copy[i].total = pesosToNumber(e.target.value);
              setPayments(copy);
            }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm"
          />

          <input
            placeholder="Aval"
            value={formatPesosRealtime(p.aval)}
            onChange={(e) => {
              const copy = [...payments];
              copy[i].aval = pesosToNumber(e.target.value);
              setPayments(copy);
            }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm"
          />

          <input
            type="date"
            value={p.date}
            onChange={(e) => {
              const copy = [...payments];
              copy[i].date = e.target.value;
              setPayments(copy);
            }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm"
          />
        </div>
      ))}
    </section>
  );
}

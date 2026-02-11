import { DISTRIBUTORS_LIST } from '@/lib/api/listData/distributors';
import { formatEnumText } from '@/lib/api/utils/utils';

export default function Distributor({ distributor, errors, setDistributor }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Distribuidor</h2>
      <select
        value={distributor}
        onChange={(e) => setDistributor(e.target.value)}
        className={`w-full px-4 py-2 rounded-xl border text-sm shadow-sm
                focus:outline-none focus:ring-2 transition ${
                  errors.distributor
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                }`}
      >
        <option value="">Seleccione un distribuidor</option>
        {DISTRIBUTORS_LIST.map((d) => (
          <option key={d} value={d}>
            {formatEnumText(d, 'uppercase')}
          </option>
        ))}
      </select>
    </section>
  );
}

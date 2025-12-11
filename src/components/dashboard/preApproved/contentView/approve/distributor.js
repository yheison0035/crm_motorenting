import { DISTRIBUTORS_LIST } from '@/lib/api/listData/distributors';
import { formatEnumText } from '@/lib/api/utils/utils';

export default function Distributor({ distributor, errors, setDistributor }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Distribuidor</h2>
      <select
        value={distributor}
        onChange={(e) => setDistributor(e.target.value)}
        className={`w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm ${
          errors.distributor ? 'border-red-500' : 'border-gray-200'
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

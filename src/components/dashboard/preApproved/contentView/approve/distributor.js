import { DISTRIBUTORS_LIST } from '@/lib/api/listData/distributors';

export default function Distributor({ distributor, setDistributor }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Distribuidor</h2>
      <select
        value={distributor}
        onChange={(e) => setDistributor(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm"
      >
        <option value="">Seleccione un distribuidor</option>
        {DISTRIBUTORS_LIST.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
    </section>
  );
}

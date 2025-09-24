import { useEffect, useState } from 'react';
import { locations } from '@/lib/api/local/locations';

export default function DepartaCiudad({ formData, handleChange }) {
  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    if (formData?.department) {
      const dep = locations.find((d) => d.department === formData.department);
      setAvailableCities(dep ? dep.city : []);
    } else {
      setAvailableCities([]);
    }
  }, [formData?.department]);

  return (
    <>
      <div className="flex flex-col">
        <label
          htmlFor="department"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Departamento
        </label>
        <select
          id="department"
          name="department"
          value={formData.department || ''}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          required
        >
          <option value="">Seleccione un departamento</option>
          {locations.map((d) => (
            <option key={d.id} value={d.department}>
              {d.department}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="city"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Ciudad
        </label>
        <select
          id="city"
          name="city"
          value={formData.city || ''}
          onChange={handleChange}
          disabled={!formData.department}
          className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition
                     disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
        >
          <option value="">
            {formData.department
              ? 'Seleccione una ciudad'
              : 'Seleccione un departamento primero'}
          </option>
          {availableCities.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

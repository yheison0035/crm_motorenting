'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function Stadistics() {
  const advisors = [
    {
      id: 1,
      name: 'Juan Pérez',
      data: {
        'INTENTANDO CONTACTAR': 3,
        INTERESADO: 7,
        'NO INTERESADO': 4,
        REPROBADO: 2,
        VENTA: 1,
      },
    },
    {
      id: 2,
      name: 'María Gómez',
      data: {
        'INTENTANDO CONTACTAR': 5,
        INTERESADO: 2,
        'NO INTERESADO': 8,
        REPROBADO: 1,
        VENTA: 4,
      },
    },
    {
      id: 3,
      name: 'Carlos Ruiz',
      data: {
        'INTENTANDO CONTACTAR': 8,
        INTERESADO: 6,
        'NO INTERESADO': 2,
        REPROBADO: 3,
        VENTA: 2,
      },
    },
    {
      id: 4,
      name: 'Ana Torres',
      data: {
        'INTENTANDO CONTACTAR': 15,
        INTERESADO: 9,
        'NO INTERESADO': 3,
        REPROBADO: 2,
        VENTA: 5,
      },
    },
    {
      id: 5,
      name: 'Jose Torres',
      data: {
        'INTENTANDO CONTACTAR': 2,
        INTERESADO: 9,
        'NO INTERESADO': 3,
        REPROBADO: 2,
        VENTA: 5,
      },
    },
    {
      id: 6,
      name: 'Maria luisa Torres',
      data: {
        'INTENTANDO CONTACTAR': 3,
        INTERESADO: 9,
        'NO INTERESADO': 3,
        REPROBADO: 2,
        VENTA: 5,
      },
    },
    {
      id: 7,
      name: 'Ernesto Perez',
      data: {
        'INTENTANDO CONTACTAR': 23,
        INTERESADO: 19,
        'NO INTERESADO': 13,
        REPROBADO: 2,
        VENTA: 25,
      },
    },
    {
      id: 8,
      name: 'Maria luisa',
      data: {
        'INTENTANDO CONTACTAR': 33,
        INTERESADO: 29,
        'NO INTERESADO': 13,
        REPROBADO: 32,
        VENTA: 15,
      },
    },
    {
      id: 9,
      name: 'Maria jose',
      data: {
        'INTENTANDO CONTACTAR': 13,
        INTERESADO: 49,
        'NO INTERESADO': 23,
        REPROBADO: 22,
        VENTA: 52,
      },
    },
  ];

  const statusList = [
    'INTENTANDO CONTACTAR',
    'INTERESADO',
    'NO INTERESADO',
    'REPROBADO',
    'VENTA',
  ];

  const [selectedAdvisors, setSelectedAdvisors] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });

  const [status, setStatus] = useState('');
  const [chartData, setChartData] = useState([]);

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedAdvisors(advisors.map((a) => a.id));
    } else {
      setSelectedAdvisors([]);
    }
    setSelectAll(!selectAll);
  };

  const handleAdvisorSelect = (id) => {
    if (selectedAdvisors.includes(id)) {
      setSelectedAdvisors(selectedAdvisors.filter((a) => a !== id));
    } else {
      setSelectedAdvisors([...selectedAdvisors, id]);
    }
  };

  const handleGenerateChart = () => {
    if (selectedAdvisors.length === 0 || !status) {
      setChartData([]);
      return;
    }

    const data = selectedAdvisors.map((id) => {
      const advisor = advisors.find((a) => a.id === id);

      return {
        name: advisor.name,
        cantidad: advisor.data[status] ?? 0,
      };
    });

    setChartData(data);
  };

  const maxValue =
    chartData.length > 0 ? Math.max(...chartData.map((d) => d.cantidad)) : 0;

  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Estadísticas
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
          <label className="font-semibold mb-2 text-gray-800 text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Asesores
          </label>

          <button
            onClick={handleSelectAll}
            className="text-sm mb-3 text-blue-600 hover:text-blue-700 font-medium transition"
          >
            {selectAll ? 'Deseleccionar todos' : 'Seleccionar todos'}
          </button>

          <div className="max-h-44 overflow-y-auto border border-gray-300 bg-white rounded-lg p-3 shadow-inner custom-scroll">
            {advisors.map((a) => (
              <label
                key={a.id}
                className="flex items-center gap-2 mb-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedAdvisors.includes(a.id)}
                  onChange={() => handleAdvisorSelect(a.id)}
                  className="h-4 w-4 accent-blue-600"
                />
                {a.name}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200 gap-3">
          <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            Rango de fechas
          </label>

          <input
            type="date"
            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
          />

          <input
            type="date"
            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
          <label className="font-semibold mb-2 text-gray-800 text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Estado
          </label>

          <select
            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Seleccione...</option>
            {statusList.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleGenerateChart}
            className="
        w-full flex items-center justify-center gap-2
        bg-blue-600 hover:bg-blue-700
        text-white font-semibold
        px-4 py-3 rounded-xl
        shadow-md hover:shadow-lg
        transition-all duration-300 active:scale-95
      "
          >
            📊 Graficar
          </button>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-red-600 rounded-full" />
            <span className="text-sm text-red-600">Cantidad menor</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-green-600 rounded-full" />
            <span className="text-sm text-green-600">Cantidad mayor</span>
          </div>
        </div>
      )}

      {chartData.length > 0 && (
        <div className="mt-6 bg-white p-4 shadow rounded-lg h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Cantidad']} />
              <Bar dataKey="cantidad">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.cantidad === maxValue ? '#16a34a' : '#dc2626'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

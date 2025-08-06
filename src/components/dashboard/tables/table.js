'use client';

import { useState, useEffect } from 'react';
import {
  EyeIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';

const Table = ({ info = [], view, setSelected, rol }) => {
  const [filtered, setFiltered] = useState(info);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState({
    nombre: '',
    correo: '',
    telefono: '',
  });

  useEffect(() => {
    const result = info.filter(
      (a) =>
        a.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
        a.correo.toLowerCase().includes(filters.correo.toLowerCase()) &&
        a.telefono.toLowerCase().includes(filters.telefono.toLowerCase())
    );
    setFiltered(result);
  }, [filters, info]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    console.log('Delete advisor with ID:', id);
  };

  const toggleCheckbox = (info) => {
    setSelectedIds((prev) => {
      const exists = prev.some((id) => id === info.id);
      if (exists) {
        return prev.filter((id) => id !== info.id);
      } else {
        return [...prev, info.id];
      }
    });
  };

  const assignAdvisor = () => {
    console.log('Assigning advisor:', selectedAdvisor);
    console.log('Selected clients:', selectedIds);
    setShowModal(false);
    setSelectedAdvisor('');
    setSelectedIds([]);
  };

  return (
    <div>
      {rol === 'Administrador' &&
        view === 'customers' &&
        selectedIds.length > 0 && (
          <button
            onClick={() => setShowModal(true)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Asignar asesor{' '}
            <span className="font-semibold">{selectedIds.length}</span>
          </button>
        )}

      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            {rol === 'Administrador' && view === 'customers' && (
              <th className="px-4 py-3 text-center">Asignar</th>
            )}
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Correo</th>
            <th className="px-4 py-3">Teléfono</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th></th>
            <th className="px-4 py-2">
              <input
                type="text"
                name="nombre"
                value={filters.nombre}
                onChange={handleFilterChange}
                placeholder="Filtrar por nombre"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </th>
            <th className="px-4 py-2">
              <input
                type="text"
                name="correo"
                value={filters.correo}
                onChange={handleFilterChange}
                placeholder="Filtrar por correo"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </th>
            <th className="px-4 py-2">
              <input
                type="text"
                name="telefono"
                value={filters.telefono}
                onChange={handleFilterChange}
                placeholder="Filtrar por teléfono"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </th>
            <th className="px-4 py-2"></th>
          </tr>
          {filtered.map((info) => (
            <tr key={info.id} className="border-b hover:bg-gray-50">
              {rol === 'Administrador' && view === 'customers' && (
                <td className="px-4 py-3 text-center">
                  {info.asesor ? (
                    <CheckIcon
                      className="w-5 h-5 text-green-600 mx-auto"
                      title="Cliente con asesor asignado"
                    />
                  ) : (
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(info.id)}
                      onChange={() => toggleCheckbox(info)}
                      title="Seleccionar para asignar"
                      className="w-4 h-4 cursor-pointer"
                    />
                  )}
                </td>
              )}
              <td className="px-4 py-3">{info.nombre}</td>
              <td className="px-4 py-3">{info.correo}</td>
              {view === 'customers' ? (
                <td className="px-4 py-3">
                  <a
                    href={`https://wa.me/${info.telefono}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-green-600 hover:underline"
                    title="Enviar mensaje por WhatsApp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0a11.94 11.94 0 0 0-10.18 18L0 24l6.29-1.64A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.2-3.48-8.52ZM12 22a9.93 9.93 0 0 1-5.07-1.38l-.36-.21-3.73.97.99-3.63-.24-.37A9.94 9.94 0 1 1 12 22Zm5.29-7.71c-.29-.14-1.7-.84-1.96-.94s-.46-.14-.66.15c-.19.29-.76.93-.93 1.12s-.34.21-.63.07a8.08 8.08 0 0 1-2.38-1.46 8.8 8.8 0 0 1-1.63-2.03c-.17-.29 0-.44.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51s-.66-1.58-.91-2.17c-.24-.58-.48-.5-.66-.51l-.56-.01a1.08 1.08 0 0 0-.77.36c-.26.29-1.01.99-1.01 2.41 0 1.41 1.03 2.78 1.17 2.97.14.19 2.03 3.1 4.94 4.35.69.3 1.23.47 1.65.6.7.22 1.34.19 1.85.12.57-.08 1.7-.7 1.94-1.38.24-.68.24-1.27.17-1.38-.08-.11-.26-.18-.55-.32Z" />
                    </svg>
                    {info.telefono}
                  </a>
                </td>
              ) : (
                <td className="px-4 py-3">{info.telefono}</td>
              )}
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => setSelected(info)}
                    className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                    title="Ver más"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>
                  <Link
                    href={`/CRM/dashboard/${view}/edit/${info.id}`}
                    className="text-green-500 hover:text-green-700 transition cursor-pointer"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(info.id)}
                    className="text-red-500 hover:text-red-700 transition cursor-pointer"
                    title="Eliminar"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Seleccionar asesor</h2>
            <select
              value={selectedAdvisor}
              onChange={(e) => setSelectedAdvisor(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            >
              <option value="">Selecciona un asesor</option>
              <option value="maria_manrrique">Maria manrrique</option>
              <option value="jorge_espinosa">Jorge Espinosa</option>
              <option value="luisa_crespo">Luisa Crespo</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={assignAdvisor}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Asignar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;

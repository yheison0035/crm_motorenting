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
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filters, setFilters] = useState({
    name: '',
    email: '',
    phone: '',
    advisor: '',
    state: '',
  });

  useEffect(() => {
    let result = info.filter(
      (a) =>
        a.name?.toLowerCase().includes(filters.name.toLowerCase()) &&
        a.email?.toLowerCase().includes(filters.email.toLowerCase()) &&
        a.phone?.toLowerCase().includes(filters.phone.toLowerCase()) &&
        (a.advisor?.toLowerCase() || '').includes(
          filters.advisor.toLowerCase()
        ) &&
        (a.state?.toLowerCase() || '').includes(filters.state.toLowerCase())
    );

    if (rol === 'Advisor' && view === 'customers') {
      result = result.filter(
        (a) => a.advisor?.toLowerCase() === 'maria manrrique'
      );
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [filters, info, view]);

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

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginatedData = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === 'prev') return Math.max(prev - 1, 1);
      if (direction === 'next') return Math.min(prev + 1, totalPages);
      return prev;
    });
  };

  const handleRowsPerPageChange = (e) => {
    const value =
      e.target.value === 'all' ? filtered.length : Number(e.target.value);
    setRowsPerPage(value);
    setCurrentPage(1);
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
              <>
                <th className="px-4 py-3 text-center">Asignar</th>
                <th className="px-4 py-3 text-center">Asesor</th>
              </>
            )}
            <th className="px-4 py-3">name</th>
            <th className="px-4 py-3">email</th>
            <th className="px-4 py-3">Teléfono</th>
            {view === 'customers' && (
              <th className="px-4 py-3">Estado Actual</th>
            )}
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {rol === 'Administrador' && view === 'customers' && (
              <>
                <th></th>
                <th className="px-4 py-2">
                  <input
                    type="text"
                    name="advisor"
                    value={filters.advisor}
                    onChange={handleFilterChange}
                    placeholder="Filtrar por asesor"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </th>
              </>
            )}
            <th className="px-4 py-2">
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Filtrar por name"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </th>
            <th className="px-4 py-2">
              <input
                type="text"
                name="email"
                value={filters.email}
                onChange={handleFilterChange}
                placeholder="Filtrar por email"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </th>
            <th className="px-4 py-2">
              <input
                type="text"
                name="phone"
                value={filters.phone}
                onChange={handleFilterChange}
                placeholder="Filtrar por teléfono"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </th>
            {view === 'customers' && (
              <th className="px-4 py-2">
                <input
                  type="text"
                  name="state"
                  value={filters.state}
                  onChange={handleFilterChange}
                  placeholder="Filtrar por estado"
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </th>
            )}
            <th className="px-4 py-2"></th>
          </tr>
          {paginatedData.map((info) => (
            <tr key={info.id} className="border-b hover:bg-gray-50">
              {rol === 'Administrador' && view === 'customers' && (
                <td className="px-4 py-3 text-center">
                  {info.advisor !== 'Sin Asignar' ? (
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
              {rol === 'Administrador' && view === 'customers' && (
                <td className="px-4 py-3">{info.advisor}</td>
              )}
              <td className="px-4 py-3">{info.name}</td>
              <td className="px-4 py-3">{info.email}</td>
              {view === 'customers' ? (
                <td className="px-4 py-3">
                  <a
                    href={`https://wa.me/${info.phone}`}
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
                    {info.phone}
                  </a>
                </td>
              ) : (
                <td className="px-4 py-3">{info.phone}</td>
              )}
              {view === 'customers' && (
                <td className="px-4 py-3">{info.state}</td>
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

      <div className="mt-4 flex flex-col md:flex-row justify-end items-center gap-4">
        <div>
          <label htmlFor="rowsPerPage" className="mr-2 text-sm text-gray-700">
            Filas por página:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage === filtered.length ? 'all' : rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value="all">Todos</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer"
          >
            Siguiente
          </button>
        </div>
      </div>

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

'use client';

import { useState } from 'react';
import {
  EyeIcon,
  TrashIcon,
  XMarkIcon,
  PlusIcon,
  PencilIcon,
  DocumentArrowUpIcon,
} from '@heroicons/react/24/outline';
import ViewCostumer from '../../viewModal';
import Link from 'next/link';
import ViewModal from '../../viewModal';

export default function Clientes() {
  const [archivo, setArchivo] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      correo: 'juanperez@correo.com',
      telefono: '3101234567',
      direccion: 'Calle 123',
      ciudad: 'Bogotá',
      documento: '123456789',
    },
    {
      id: 2,
      nombre: 'María López',
      correo: 'marialopez@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setArchivo(file);
  };

  const handleRemoveFile = () => {
    setArchivo(null);
  };

  const handleVerMas = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleEliminar = (id) => {
    console.log('Eliminar cliente ID:', id);
  };

  const handleAgregarCliente = () => {
    console.log('Abrir formulario para agregar cliente');
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Listado de Clientes
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <button
            onClick={handleAgregarCliente}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            <PlusIcon className="w-4 h-4" />
            Agregar cliente
          </button>

          {!archivo ? (
            <label className="flex items-center gap-2 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
              <DocumentArrowUpIcon className="w-4 h-4" />
              Importar Excel
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="flex items-center bg-green-100 border border-green-400 px-4 py-2 rounded-lg">
              <span className="text-green-800 text-sm font-medium truncate max-w-[200px]">
                {archivo.name}
              </span>
              <button
                onClick={handleRemoveFile}
                className="ml-2 text-red-500 hover:text-red-700"
                title="Eliminar archivo"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{customer.nombre}</td>
                <td className="px-4 py-3">{customer.correo}</td>
                <td className="px-4 py-3">
                  <a
                    href={`https://wa.me/${customer.telefono}`}
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
                    {customer.telefono}
                  </a>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => handleVerMas(customer)}
                      className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                      title="Ver más"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <Link
                      href={`/CRM/dashboard/customers/edit/${customer.id}`}
                      className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                    >
                      <span>
                        <PencilIcon className="w-5 h-5" />
                      </span>
                    </Link>
                    <button
                      onClick={() => handleEliminar(customer.id)}
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
        {selectedCustomer && (
          <ViewModal
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
          />
        )}
      </div>
    </div>
  );
}

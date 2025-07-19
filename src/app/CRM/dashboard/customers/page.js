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
                <td className="px-4 py-3">{customer.telefono}</td>
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

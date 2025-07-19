'use client';

import { useState } from 'react';
import {
  EyeIcon,
  TrashIcon,
  PlusIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import ViewModal from '../../viewModal';

export default function Advisors() {
  const [advisors, setAdvisors] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const advisor = [
    {
      id: 1,
      nombre: 'Laura Pérez',
      correo: 'laura.perez@empresa.com',
      telefono: '3101234567',
      direccion: 'Calle 123',
      ciudad: 'Bogotá',
      documento: '123456789',
    },
    {
      id: 2,
      nombre: 'Carlos Gómez',
      correo: 'carlos.gomez@empresa.com',
      telefono: '3129876543',
      direccion: 'Calle 123',
      ciudad: 'Bogotá',
      documento: '123456789',
    },
    {
      id: 3,
      nombre: 'Ana Torres',
      correo: 'ana.torres@empresa.com',
      telefono: '3006543210',
      direccion: 'Calle 123',
      ciudad: 'Bogotá',
      documento: '123456789',
    },
  ];

  const handleVerMas = (data) => {
    setSelectedCustomer(data);
  };

  const handleEliminar = (id) => {
    console.log('Eliminar asesor con ID:', id);
  };

  const handleAgregarAsesor = () => {
    console.log('Abrir formulario para agregar asesor');
  };

  return (
    <div className="w-full p-4">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Listado de Asesores
        </h1>

        <button
          onClick={handleAgregarAsesor}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          <PlusIcon className="w-4 h-4" />
          Agregar asesor
        </button>
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
            {advisor.map((advisor) => (
              <tr key={advisor.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{advisor.nombre}</td>
                <td className="px-4 py-3">{advisor.correo}</td>
                <td className="px-4 py-3">{advisor.telefono}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => handleVerMas(advisor)}
                      className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                      title="Ver más"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <Link
                      href={`/CRM/dashboard/advisors/edit/${advisor.id}`}
                      className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                    >
                      <span>
                        <PencilIcon className="w-5 h-5" />
                      </span>
                    </Link>
                    <button
                      onClick={() => handleEliminar(advisor.id)}
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

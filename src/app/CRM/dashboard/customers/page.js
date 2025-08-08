'use client';

import { useState } from 'react';
import {
  XMarkIcon,
  PlusIcon,
  DocumentArrowUpIcon,
} from '@heroicons/react/24/outline';
import ViewModal from '../../viewModal';
import Table from '@/components/dashboard/tables/table';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';

export default function Clientes() {
  const [archivo, setArchivo] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { usuario } = useAuth();

  const customers = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      correo: 'juanperez@correo.com',
      telefono: '3101234567',
      direccion: 'Calle 123',
      ciudad: 'Bogotá',
      documento: '123456789',
      asesor: 'Maria Manrrique',
    },
    {
      id: 2,
      nombre: 'María López',
      correo: 'marialopez@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Jorge Espinosa',
    },
    {
      id: 3,
      nombre: 'Enrique Montalve',
      correo: 'enrique@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 4,
      nombre: 'Jorge lopez',
      correo: 'jorgelopez@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 5,
      nombre: 'Sofia Montalve',
      correo: 'sofiamontalve@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 6,
      nombre: 'Manuel Quiara',
      correo: 'jorgelopez@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Maria Manrrique',
    },
    {
      id: 7,
      nombre: 'Yeison Montalve',
      correo: 'sofiamontalve@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 8,
      nombre: 'Cristina lopez',
      correo: 'jorgelopez@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 9,
      nombre: 'Oscar Montalve',
      correo: 'sofiamontalve@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Jorge Espinosa',
    },
    {
      id: 10,
      nombre: 'Juan Pérez',
      correo: 'juanperez@correo.com',
      telefono: '3101234567',
      direccion: 'Calle 123',
      ciudad: 'Bogotá',
      documento: '123456789',
      asesor: 'Maria Manrrique',
    },
    {
      id: 11,
      nombre: 'María López',
      correo: 'marialopez@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Jorge Espinosa',
    },
    {
      id: 12,
      nombre: 'Enrique Montalve',
      correo: 'enrique@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 13,
      nombre: 'Jorge lopez',
      correo: 'jorgelopez@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 14,
      nombre: 'Sofia Montalve',
      correo: 'sofiamontalve@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 15,
      nombre: 'Manuel Quiara',
      correo: 'jorgelopez@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Maria Manrrique',
    },
    {
      id: 16,
      nombre: 'Yeison Montalve',
      correo: 'sofiamontalve@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 17,
      nombre: 'Cristina lopez',
      correo: 'jorgelopez@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 18,
      nombre: 'Oscar Montalve',
      correo: 'sofiamontalve@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Jorge Espinosa',
    },
    {
      id: 19,
      nombre: 'Juan Pérez',
      correo: 'juanperez@correo.com',
      telefono: '3101234567',
      direccion: 'Calle 123',
      ciudad: 'Bogotá',
      documento: '123456789',
      asesor: 'Maria Manrrique',
    },
    {
      id: 20,
      nombre: 'María López',
      correo: 'marialopez@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Jorge Espinosa',
    },
    {
      id: 21,
      nombre: 'Enrique Montalve',
      correo: 'enrique@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 22,
      nombre: 'Jorge lopez',
      correo: 'jorgelopez@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 23,
      nombre: 'Sofia Montalve',
      correo: 'sofiamontalve@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 24,
      nombre: 'Manuel Quiara',
      correo: 'jorgelopez@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Maria Manrrique',
    },
    {
      id: 25,
      nombre: 'Yeison Montalve',
      correo: 'sofiamontalve@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 26,
      nombre: 'Cristina lopez',
      correo: 'jorgelopez@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Sin Asignar',
    },
    {
      id: 27,
      nombre: 'Oscar Montalve',
      correo: 'sofiamontalve@correo.com',
      telefono: '3129876543',
      direccion: 'Carrera 456',
      ciudad: 'Medellín',
      documento: '987654321',
      asesor: 'Jorge Espinosa',
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setArchivo(file);
  };

  const handleRemoveFile = () => {
    setArchivo(null);
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Listado de Clientes
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          {usuario?.rol === 'Administrador' && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Link
                href="/CRM/dashboard/customers/new"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Agregar cliente</span>
              </Link>

              {!archivo ? (
                <label className="flex items-center gap-2 cursor-pointer bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 transition">
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
          )}
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <Table
          info={customers}
          view="customers"
          setSelected={setSelectedCustomer}
          rol={usuario?.rol}
        />
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

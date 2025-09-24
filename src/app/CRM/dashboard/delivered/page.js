'use client';

import { useEffect, useState } from 'react';
import ViewModal from '../../viewModal';
import Table from '@/components/dashboard/tables/table';
import { useAuth } from '@/context/authContext';
import useCustomers from '@/lib/api/hooks/useCustomers';

export default function Delivered() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { usuario } = useAuth();
  const [customers, setCustomers] = useState([]);

  const { getCustomers, loading, error } = useCustomers();

  const fetchCustomers = async () => {
    try {
      const { data } = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Listado de Clientes Entregados
        </h1>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <Table
          info={customers || []}
          view="customers"
          setSelected={setSelectedCustomer}
          rol={usuario?.role}
          fetchCustomers={fetchCustomers}
          loading={loading}
          error={error}
        />
        {selectedCustomer && (
          <ViewModal
            data={selectedCustomer}
            type="customer"
            onClose={() => setSelectedCustomer(null)}
          />
        )}
      </div>
    </div>
  );
}

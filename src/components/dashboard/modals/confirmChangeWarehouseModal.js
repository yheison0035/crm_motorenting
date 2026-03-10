import useCustomers from '@/lib/api/hooks/useCustomers';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import AlertModal from './alertModal';
import { useState } from 'react';

export default function ConfirmChangeWarehouseModal({
  data,
  view,
  onClose,
  loading,
}) {
  const { updateCustomerWarehouseArchive } = useCustomers();
  const [alert, setAlert] = useState({ type: '', message: '', url: '' });

  if (!data) return null;

  const handleSubmit = async () => {
    try {
      await updateCustomerWarehouseArchive(data.id);

      setAlert({
        type: 'success',
        message: `El cliente se archivó correctamente.`,
      });
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.message || `Error al archivar cliente`,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Confirmar cambio
        </h2>
        <p className="text-gray-600">
          ¿Estás segur@ de que quieres archivar este cliente?
        </p>
        <h3 className="font-bold text-gray-600">{data.name}</h3>
        <p className="text-gray-600">Esta acción no se puede deshacer.</p>

        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-sm
               text-sm font-medium text-white transition-all duration-200 shadow-sm cursor-pointer
              ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-orange-600 hover:bg-orange-700 active:scale-95'
              }`}
          >
            <ArchiveBoxIcon className="w-4 h-4" />
            {loading ? 'Archivando...' : 'Archivar'}
          </button>
        </div>
      </div>
      <AlertModal
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: '', message: '' }, onClose(true))}
        url={alert.url}
      />
    </div>
  );
}

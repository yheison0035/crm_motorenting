'use client';

import { useState } from 'react';
import { formatPesosRealtime, pesosToNumber } from '@/lib/api/utils/utils';
import {
  MagnifyingGlassCircleIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import usePayments from '@/lib/api/hooks/usePayments';
import AlertModal from '@/components/dashboard/modals/alertModal';

export default function Payments() {
  const [orderNumber, setOrderNumber] = useState('');
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [receipt, setReceipt] = useState({
    receiptNumber: '',
    date: '',
    amount: '',
  });
  const [alert, setAlert] = useState({ type: '', message: '', url: '' });

  const { getPaymentByOrderNumber, createPayment } = usePayments();

  const handleSearch = async () => {
    if (!orderNumber.trim()) {
      setErrors({ orderNumber: 'El número de orden es obligatorio' });
      return;
    }

    try {
      const { data } = await getPaymentByOrderNumber(orderNumber);
      if (!data) {
        setErrors({ orderNumber: 'Número de orden no encontrado' });
        return;
      }
      setErrors({});
      setResults({
        id: data.id,
        name: data.name,
        orderNumber: data.orderNumber,
        outstandingBalance: data.outstandingBalance,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePayment = async () => {
    if (!results) return;

    if (!receipt.receiptNumber || !receipt.date || !receipt.amount) {
      setAlert({
        type: 'error',
        message: 'Todos los campos son obligatorios',
        url: '',
      });
      return;
    }

    try {
      const { data } = await createPayment(results.id, receipt);

      if (!data) {
        setAlert({
          type: 'error',
          message: 'No se pudo registrar el pago',
          url: '',
        });
        return;
      }

      setResults({
        id: data.customerId,
        name: results.name,
        orderNumber: results.orderNumber,
        outstandingBalance: results.outstandingBalance - data.amount,
      });

      setAlert({
        type: 'success',
        message: 'Pago registrado correctamente',
        url: '',
      });
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', message: 'Error al registrar pago', url: '' });
    }

    setReceipt({ receiptNumber: '', date: '', amount: '' });
    setOpenModal(false);
  };

  const clearResults = () => {
    setResults(null);
    setOrderNumber('');
    setReceipt({ receiptNumber: '', date: '', amount: '' });
    setErrors({});
    setOpenModal(false);
  };

  return (
    <div className="w-full p-4 space-y-6">
      <Header />
      <SearchOrder
        orderNumber={orderNumber}
        setOrderNumber={setOrderNumber}
        handleSearch={handleSearch}
        error={errors.orderNumber}
      />
      {results && results.id && (
        <ResultsTable
          results={results}
          onPayClick={() => setOpenModal(true)}
          clearResults={clearResults}
        />
      )}
      {openModal && (
        <PaymentModal
          receipt={receipt}
          setReceipt={setReceipt}
          onClose={() => setOpenModal(false)}
          onSave={handleSavePayment}
        />
      )}

      <AlertModal
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: '', message: '', url: '' })}
        url={alert.url}
      />
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
        Realizar Pagos
      </h1>
    </div>
  );
}

function SearchOrder({ orderNumber, setOrderNumber, handleSearch, error }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
      <label className="block text-gray-700 font-semibold mb-2">
        Número de Orden
      </label>
      <div className="flex gap-3">
        <input
          type="text"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Ej: MRS0001"
          className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm focus:outline-none transition focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md flex items-center gap-2 transition active:scale-95 cursor-pointer"
        >
          <MagnifyingGlassCircleIcon className="w-5 h-5" />
          Buscar
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

function ResultsTable({ results, onPayClick, clearResults }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 space-y-4">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-600 text-sm border-b">
            <th className="pb-3">Cliente</th>
            <th className="pb-3">Saldo por pagar</th>
            <th className="pb-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-gray-800 border-b">
            <td className="py-4">{results.name}</td>
            <td className="py-4 font-semibold">
              {formatPesosRealtime(results.outstandingBalance)}
            </td>
            <td className="py-4">
              {results.outstandingBalance > 0 ? (
                <button
                  onClick={onPayClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow-md flex items-center gap-2 transition active:scale-95 cursor-pointer"
                >
                  <CurrencyDollarIcon className="w-5 h-5" />
                  Pagar
                </button>
              ) : (
                <span className="text-green-600 font-medium">✔ Pagado</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end">
        <button
          onClick={clearResults}
          className="px-5 py-2 bg-orange-500 hover:bg-white border hover:border-orange-500 hover:text-orange-500 text-gray-100 font-semibold rounded-xl shadow-sm transition active:scale-95"
        >
          Limpiar resultados
        </button>
      </div>
    </div>
  );
}

function PaymentModal({ receipt, setReceipt, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Registrar Pago
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            placeholder="Número de recibo"
            value={receipt.receiptNumber}
            onChange={(e) =>
              setReceipt({ ...receipt, receiptNumber: e.target.value })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm focus:outline-none transition focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <input
            type="date"
            value={receipt.date}
            onChange={(e) => setReceipt({ ...receipt, date: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm focus:outline-none transition focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <input
            placeholder="Valor"
            value={formatPesosRealtime(receipt.amount)}
            onChange={(e) =>
              setReceipt({ ...receipt, amount: pesosToNumber(e.target.value) })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm focus:outline-none transition focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <button
          onClick={onSave}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
        >
          <CurrencyDollarIcon className="w-5 h-5" />
          Realizar Pago
        </button>
      </div>
    </div>
  );
}

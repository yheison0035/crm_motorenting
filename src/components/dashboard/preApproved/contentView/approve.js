'use client';

import React, { useState, useEffect } from 'react';
import Holders from './approve/holders';
import Purchase from './approve/purchase';
import CashReceipts from './approve/cashReceipts';
import Payments from './approve/payments';
import Distributor from './approve/distributor';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import useApproved from '@/lib/api/hooks/useApproved';
import AlertModal from '../../modals/alertModal';

export default function Approve({ data }) {
  const [holders, setHolders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [receipts, setReceipts] = useState([]);

  const [purchase, setPurchase] = useState({
    brand: '',
    reference: '',
    mainColor: '',
    optionalColor: '',
    commercialValue: 0,
    processValue: 0,
    totalValue: 0,
  });

  const [distributor, setDistributor] = useState('');
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: '', message: '', url: '' });

  const { createApproved } = useApproved();

  useEffect(() => {
    const totalValue =
      Number(purchase.commercialValue || 0) +
      Number(purchase.processValue || 0);

    setPurchase((prev) => ({
      ...prev,
      totalValue,
    }));
  }, [purchase.commercialValue, purchase.processValue]);

  const validatePurchase = () => {
    const e = {};
    if (!purchase.brand) e.brand = true;
    if (!purchase.reference) e.reference = true;
    if (!purchase.mainColor) e.mainColor = true;
    if (!purchase.optionalColor) e.optionalColor = true;
    if (!purchase.commercialValue) e.commercialValue = true;
    if (!purchase.processValue) e.processValue = true;
    if (!distributor) e.distributor = true;
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const purchaseErrors = validatePurchase();

    if (Object.keys(purchaseErrors).length > 0) {
      setErrors(purchaseErrors);
      return;
    }

    const dataApproved = {
      saleState: 'APROBADO',
      distributor,
      holders,
      purchase,
      payments,
      receipts,
    };
    try {
      await createApproved(Number(data.id), dataApproved);
      setAlert({
        type: 'success',
        message: 'Cliente aprobado correctamente.',
        url: `/CRM/dashboard/approved`,
      });
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.message || 'Error al actualizar cliente',
      });
    }
  };

  const addHolder = () =>
    setHolders([
      ...holders,
      {
        fullName: '',
        document: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        financialEntity: '',
      },
    ]);

  const addPayment = () =>
    setPayments([
      ...payments,
      { financialEntity: '', totalPayment: '', aval: '', approvalDate: '' },
    ]);

  const addReceipt = () =>
    setReceipts([...receipts, { receiptNumber: '', date: '', amount: '' }]);

  return (
    <div className="space-y-8 p-4">
      <Holders
        addHolder={addHolder}
        holders={holders}
        setHolders={setHolders}
      />

      <Purchase purchase={purchase} errors={errors} setPurchase={setPurchase} />

      <Payments
        addPayment={addPayment}
        payments={payments}
        setPayments={setPayments}
      />

      <CashReceipts
        addReceipt={addReceipt}
        receipts={receipts}
        setReceipts={setReceipts}
      />

      <Distributor
        distributor={distributor}
        errors={errors}
        setDistributor={setDistributor}
      />

      <section>
        {errors.processValue && (
          <p className="text-sm text-red-600">Hay campos obligatorios.</p>
        )}
      </section>

      <div className="flex justify-end mt-6 gap-3">
        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-4 py-2 mr-2 border border-transparent bg-blue-600 text-white font-medium rounded-lg hover:bg-white hover:text-orange-600 hover:border-orange-600 transition-colors duration-200 cursor-pointer"
        >
          <CheckCircleIcon className="w-5 h-5" />
          Guardar y Aprobar
        </button>
      </div>

      <AlertModal
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: '', message: '' })}
        url={alert.url}
      />
    </div>
  );
}

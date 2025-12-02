'use client';

import React, { useState } from 'react';
import Holders from './approve/holders';
import Purchase from './approve/purchase';
import CashReceipts from './approve/cashReceipts';
import Payments from './approve/payments';
import Distributor from './approve/distributor';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Approve({ onSubmit }) {
  const [holders, setHolders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [receipts, setReceipts] = useState([]);

  const [purchase, setPurchase] = useState({
    brand: '',
    reference: '',
    colorMain: '',
    colorOptional: '',
    commercialValue: '',
    processValue: '',
    total: '',
  });

  const [distributor, setDistributor] = useState('');
  const [errors, setErrors] = useState({});

  const calcTotal = (commercialValue, processValue) => {
    const cv = Number(commercialValue) || 0;
    const pv = Number(processValue) || 0;
    return cv + pv;
  };

  const validatePurchase = () => {
    const e = {};
    if (!purchase.brand) e.brand = true;
    if (!purchase.reference) e.reference = true;
    if (!purchase.colorMain) e.colorMain = true;
    if (!purchase.commercialValue) e.commercialValue = true;
    if (!purchase.processValue) e.processValue = true;
    return e;
  };

  const handleSubmit = () => {
    const purchaseErrors = validatePurchase();

    if (Object.keys(purchaseErrors).length > 0) {
      setErrors(purchaseErrors);
      return;
    }

    onSubmit({
      holders,
      purchase,
      payments,
      receipts,
      distributor,
    });
  };

  const addHolder = () =>
    setHolders([
      ...holders,
      {
        name: '',
        id: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        financial: '',
      },
    ]);

  const addPayment = () =>
    setPayments([
      ...payments,
      { financial: '', total: '', aval: '', date: '' },
    ]);

  const addReceipt = () =>
    setReceipts([...receipts, { number: '', date: '', value: '' }]);

  return (
    <div className="space-y-8 p-4">
      <Holders
        addHolder={addHolder}
        holders={holders}
        setHolders={setHolders}
      />
      <Purchase
        purchase={purchase}
        calcTotal={calcTotal}
        errors={errors}
        setPurchase={setPurchase}
      />

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

      <Distributor distributor={distributor} setDistributor={setDistributor} />

      <section>
        {errors.processValue && (
          <p className="text-sm text-red-600">Hay campos es obligatorio.</p>
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
    </div>
  );
}

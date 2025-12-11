'use client';
import { useCallback, useState } from 'react';
import {
  getInvoiceByOrderNumber,
  updateInvoiceByOrderNumber,
} from '../invoices/index';

export default function useInvoices() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const wrap = useCallback(async (fn, ...args) => {
    setLoading(true);
    setError(null);
    try {
      return await fn(...args);
    } catch (err) {
      setError(err.message || 'Error en operación');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getInvoiceByOrderNumberFn = useCallback(
    (orderNumber) => wrap(getInvoiceByOrderNumber, orderNumber),
    [wrap]
  );

  const updateInvoiceByOrderNumberFn = useCallback(
    (orderNumber, dto) => wrap(updateInvoiceByOrderNumber, orderNumber, dto),
    [wrap]
  );

  return {
    getInvoiceByOrderNumber: getInvoiceByOrderNumberFn,
    updateInvoiceByOrderNumber: updateInvoiceByOrderNumberFn,
    loading,
    error,
  };
}

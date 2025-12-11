'use client';
import { useCallback, useState } from 'react';
import {
  getRegistrationByOrderNumber,
  updateRegistrationByOrderNumber,
} from '../registrations/index';

export default function useRegistrations() {
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

  const getRegistrationByOrderNumberFn = useCallback(
    (orderNumber) => wrap(getRegistrationByOrderNumber, orderNumber),
    [wrap]
  );

  const updateRegistrationByOrderNumberFn = useCallback(
    (orderNumber, dto) =>
      wrap(updateRegistrationByOrderNumber, orderNumber, dto),
    [wrap]
  );

  return {
    getRegistrationByOrderNumber: getRegistrationByOrderNumberFn,
    updateRegistrationByOrderNumber: updateRegistrationByOrderNumberFn,
    loading,
    error,
  };
}

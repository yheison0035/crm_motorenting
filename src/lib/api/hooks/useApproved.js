'use client';
import { useCallback, useState } from 'react';
import {
  getPreApproveds,
  getApproveds,
  createApproved,
  exportAllCustomersApproved,
  downloadDeliveryOrder,
  createScheduleDelivery,
} from '../approved/index';

export default function useApproved() {
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

  const getPreApprovedsFn = useCallback(
    (page, limit) => wrap(getPreApproveds, page, limit),
    [wrap]
  );
  const getApprovedsFn = useCallback(
    (page, limit) => wrap(getApproveds, page, limit),
    [wrap]
  );
  const createApprovedFn = useCallback(
    (id, dto) => wrap(createApproved, id, dto),
    [wrap]
  );
  const exportAllCustomersApprovedFn = useCallback(
    () => wrap(exportAllCustomersApproved),
    [wrap]
  );
  const downloadDeliveryOrderFn = useCallback(
    (customerId, nameCustomer) =>
      wrap(downloadDeliveryOrder, customerId, nameCustomer),
    [wrap]
  );
  const createScheduleDeliveryFn = useCallback(
    (id, dto) => wrap(createScheduleDelivery, id, dto),
    [wrap]
  );

  return {
    getPreApproveds: getPreApprovedsFn,
    getApproveds: getApprovedsFn,
    createApproved: createApprovedFn,
    exportAllCustomersApproved: exportAllCustomersApprovedFn,
    downloadDeliveryOrder: downloadDeliveryOrderFn,
    createScheduleDelivery: createScheduleDeliveryFn,
    loading,
    error,
  };
}

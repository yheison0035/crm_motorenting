'use client';
import { useCallback, useState } from 'react';
import {
  getCustomers,
  getDeliveredCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  addComment,
  assignAdvisor,
  assignMultipleCustomers,
  importCustomers,
  exportDeliveredCustomers,
  getArchivedCustomers,
  updateCustomerWarehouseArchive,
  updateCustomerWarehouseRestore,
  finalizeCustomer,
} from '../customers/index';

export default function useCustomers() {
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

  const getCustomersFn = useCallback(
    (page, limit) => wrap(getCustomers, page, limit),
    [wrap]
  );
  const getDeliveredCustomersFn = useCallback(
    (page, limit) => wrap(getDeliveredCustomers, page, limit),
    [wrap]
  );
  const getCustomerByIdFn = useCallback(
    (id) => wrap(getCustomerById, id),
    [wrap]
  );
  const createCustomerFn = useCallback(
    (dto) => wrap(createCustomer, dto),
    [wrap]
  );
  const updateCustomerFn = useCallback(
    (id, dto) => wrap(updateCustomer, id, dto),
    [wrap]
  );
  const deleteCustomerFn = useCallback(
    (id) => wrap(deleteCustomer, id),
    [wrap]
  );
  const addCommentFn = useCallback(
    (id, desc, saleState) => wrap(addComment, id, desc, saleState),
    [wrap]
  );
  const assignAdvisorFn = useCallback(
    (cid, aid) => wrap(assignAdvisor, cid, aid),
    [wrap]
  );
  const assignMultipleCustomersFn = useCallback(
    (customerIds, selectedAdvisor) =>
      wrap(assignMultipleCustomers, { customerIds, selectedAdvisor }),
    [wrap]
  );
  const importCustomersFn = useCallback(
    (file) => wrap(importCustomers, file),
    [wrap]
  );
  const exportDeliveredCustomersFn = useCallback(
    () => wrap(exportDeliveredCustomers),
    [wrap]
  );
  const getArchivedCustomersFn = useCallback(
    (page, limit) => wrap(getArchivedCustomers, page, limit),
    [wrap]
  );
  const updateCustomerWarehouseArchiveFn = useCallback(
    (id) => wrap(updateCustomerWarehouseArchive, id),
    [wrap]
  );
  const updateCustomerWarehouseRestoreFn = useCallback(
    (id) => wrap(updateCustomerWarehouseRestore, id),
    [wrap]
  );

  const finalizeCustomerFn = useCallback(
    (id, dto) => wrap(finalizeCustomer, id, dto),
    [wrap]
  );

  return {
    getCustomers: getCustomersFn,
    getDeliveredCustomers: getDeliveredCustomersFn,
    getCustomerById: getCustomerByIdFn,
    createCustomer: createCustomerFn,
    updateCustomer: updateCustomerFn,
    deleteCustomer: deleteCustomerFn,
    addComment: addCommentFn,
    assignAdvisor: assignAdvisorFn,
    assignMultipleCustomers: assignMultipleCustomersFn,
    importCustomers: importCustomersFn,
    exportDeliveredCustomers: exportDeliveredCustomersFn,
    getArchivedCustomers: getArchivedCustomersFn,
    updateCustomerWarehouseArchive: updateCustomerWarehouseArchiveFn,
    updateCustomerWarehouseRestore: updateCustomerWarehouseRestoreFn,
    finalizeCustomer: finalizeCustomerFn,
    loading,
    error,
  };
}

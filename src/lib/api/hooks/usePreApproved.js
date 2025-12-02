'use client';
import { useCallback, useState } from 'react';
import {
  getPreApproveds,
  getPreApprovedById,
  createPreApproved,
  updatePreApproved,
  deletePreApproved,
  addComment,
} from '../preApproved/index';

export default function usePreApproved() {
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

  const getPreApprovedsFn = useCallback(() => wrap(getPreApproveds), [wrap]);
  const getPreApprovedByIdFn = useCallback(
    (id) => wrap(getPreApprovedById, id),
    [wrap]
  );
  const createPreApprovedFn = useCallback(
    (dto) => wrap(createPreApproved, dto),
    [wrap]
  );
  const updatePreApprovedFn = useCallback(
    (id, dto) => wrap(updatePreApproved, id, dto),
    [wrap]
  );
  const deletePreApprovedFn = useCallback(
    (id) => wrap(deletePreApproved, id),
    [wrap]
  );
  const addCommentFn = useCallback(
    (id, desc) => wrap(addComment, id, desc),
    [wrap]
  );
  return {
    getPreApproveds: getPreApprovedsFn,
    getPreApprovedById: getPreApprovedByIdFn,
    createPreApproved: createPreApprovedFn,
    updatePreApproved: updatePreApprovedFn,
    deletePreApproved: deletePreApprovedFn,
    addComment: addCommentFn,
    loading,
    error,
  };
}

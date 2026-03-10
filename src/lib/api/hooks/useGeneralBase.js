'use client';
import { useCallback, useState } from 'react';
import { exportGeneralBase } from '../generalBase/index';

export default function useGeneralBase() {
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

  const exportGeneralBaseFn = useCallback(
    (dto) => wrap(exportGeneralBase, dto),
    [wrap]
  );

  return {
    exportGeneralBase: exportGeneralBaseFn,
    loading,
    error,
  };
}

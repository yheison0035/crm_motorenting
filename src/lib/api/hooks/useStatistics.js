'use client';
import { useCallback, useState } from 'react';
import { getStatistics } from '../statistics/index';

export default function useStatistics() {
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

  const getStatisticsFn = useCallback(
    (dto) => wrap(getStatistics, dto),
    [wrap]
  );
  return {
    getStatistics: getStatisticsFn,
    loading,
    error,
  };
}

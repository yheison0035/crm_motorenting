'use client';

import { useCallback, useState } from 'react';
import { getStates, getStateById } from '../states';

export default function useStates() {
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

  const getStatesFn = useCallback(() => wrap(getStates), [wrap]);
  const getStateByIdFn = useCallback((id) => wrap(getStateById, id), [wrap]);

  return {
    getStates: getStatesFn,
    getStateById: getStateByIdFn,
    loading,
    error,
  };
}

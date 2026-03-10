import apiFetch from '../auth/client';

export async function getAllCreditManagement(params = {}) {
  const { page = 1, limit = 10, ...filters } = params;

  const query = new URLSearchParams();

  query.set('page', String(page));
  query.set('limit', String(limit));

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      query.set(key, String(value));
    }
  });

  return apiFetch(`/credit-management?${query.toString()}`);
}

export async function updateCreditStatus(id, status) {
  return apiFetch(`/credit-management/${id}/status`, {
    method: 'POST',
    body: JSON.stringify({ status }),
  });
}

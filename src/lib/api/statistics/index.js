import apiFetch from '../auth/client';

export async function getStatistics(payload) {
  return apiFetch('/statistics', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

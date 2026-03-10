import apiFetch from '../auth/client';

export async function getAllMotoForDelivery(params = {}) {
  const { page = 1, limit = 10, ...filters } = params;

  const query = new URLSearchParams();

  query.set('page', String(page));
  query.set('limit', String(limit));

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      query.set(key, String(value));
    }
  });

  return apiFetch(`/moto-for-delivery?${query.toString()}`);
}

export async function updateMotoForDeliveryStatus(id, status) {
  return apiFetch(`/moto-for-delivery/${id}/status`, {
    method: 'POST',
    body: JSON.stringify({ status }),
  });
}

export async function getMotorcyclesScheduled(params = {}) {
  const { page = 1, limit = 10, ...filters } = params;

  const query = new URLSearchParams();

  query.set('page', String(page));
  query.set('limit', String(limit));

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      query.set(key, String(value));
    }
  });

  return apiFetch(
    `/moto-for-delivery/motorcycles-scheduled?${query.toString()}`
  );
}

export async function createEvidenceMotorcyclesScheduled(
  scheduleId,
  { deliveredAt, photoOne, photoTwo }
) {
  const formData = new FormData();

  formData.append('deliveredAt', deliveredAt);
  formData.append('photoOne', photoOne);
  formData.append('photoTwo', photoTwo);

  return apiFetch(`/moto-for-delivery/delivery-evidence/${scheduleId}`, {
    method: 'POST',
    body: formData,
  });
}

export async function updateDeliveryStatus(id, status) {
  return apiFetch(`/moto-for-delivery/${id}/delivery-state`, {
    method: 'POST',
    body: JSON.stringify({ status }),
  });
}

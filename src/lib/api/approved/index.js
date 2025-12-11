import apiFetch from '../auth/client';

export async function getPreApproveds() {
  return apiFetch('/customers/preApproved');
}

export async function getApproveds() {
  return apiFetch('/customers/approved');
}

export async function createApproved(id, dataApproved) {
  const body = dataApproved;
  return apiFetch(`/customers/${id}/approve`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function exportAllCustomersApproved() {
  const blob = await apiFetch('/customers/export-approved', {
    method: 'GET',
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `clientes_aprobados_${Date.now()}.xlsx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

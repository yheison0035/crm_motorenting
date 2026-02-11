import apiFetch from '../auth/client';

export async function getRegistrationByOrderNumber(value) {
  return apiFetch(`/customers/registrations/${value}`);
}

export async function updateRegistrationByOrderNumber(
  orderNumber,
  dataInvoice
) {
  const body = dataInvoice;
  return apiFetch(`/customers/${orderNumber}/registrations`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

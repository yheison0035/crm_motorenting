import apiFetch from '../auth/client';

export async function getRegistrationByOrderNumber(orderNumber) {
  return apiFetch(`/customers/registrations/${orderNumber}`);
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

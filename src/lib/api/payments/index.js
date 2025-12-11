import apiFetch from '../auth/client';

export async function getPaymentByOrderNumber(orderNumber) {
  return apiFetch(`/customers/order/${orderNumber}`);
}

export async function createPayment(orderNumber, dataPayment) {
  const body = dataPayment;
  return apiFetch(`/customers/${orderNumber}/payments`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

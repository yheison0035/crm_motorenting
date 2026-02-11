import apiFetch from '../auth/client';

export async function getInvoiceByOrderNumber(value) {
  return apiFetch(`/customers/invoices/${value}`);
}

export async function updateInvoiceByOrderNumber(orderNumber, dataInvoice) {
  const body = dataInvoice;
  return apiFetch(`/customers/${orderNumber}/invoices`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

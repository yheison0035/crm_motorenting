import apiFetch from '../auth/client';
import { toFullISO } from '../utils/utils';

export async function getPreApproveds() {
  return apiFetch('/customers');
}

export async function getPreApprovedById(id) {
  return apiFetch(`/customers/${id}`);
}

export async function createPreApproved(dto) {
  const body = {
    ...dto,
    birthdate: dto.birthdate ? toFullISO(dto.birthdate) : undefined,
    advisorId: Number(dto.advisorId),
    stateId: Number(dto.stateId),
  };
  return apiFetch('/customers', { method: 'POST', body: JSON.stringify(body) });
}

export async function updatePreApproved(id, dto) {
  const {
    id: _id,
    createdAt,
    updatedAt,
    assignedAt,
    advisor,
    comments,
    state,
    ...cleanDto
  } = dto;

  const body = {
    ...cleanDto,
    stateId: Number(cleanDto.stateId) || null,
    advisorId: Number(cleanDto.advisorId) || null,
    birthdate: cleanDto.birthdate ? toFullISO(cleanDto.birthdate) : undefined,
  };

  return apiFetch(`/customers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function deletePreApproved(id) {
  return apiFetch(`/customers/${id}`, { method: 'DELETE' });
}

export async function addComment(customerId, description) {
  return apiFetch(`/customers/${customerId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ description }),
  });
}

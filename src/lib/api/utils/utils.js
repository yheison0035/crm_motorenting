export function toFullISO(input) {
  if (!input) return null;

  if (typeof input === 'string' && input.includes('/')) {
    const [d, m, y] = input.split('/').map((p) => p.trim());
    const iso = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    const dt = new Date(iso);
    return isNaN(dt.getTime()) ? null : dt.toISOString();
  }

  const d = new Date(input);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

export function normalizeDateForInput(input) {
  if (!input) return '';

  const d = new Date(input);
  if (isNaN(d.getTime())) return '';

  return d.toISOString().split('T')[0];
}

export const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('es-CO') : 'No disponible';

export const parseLocalDate = (str) => {
  const [year, month, day] = str.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export function formatPesosRealtime(value) {
  if (value === null || value === undefined) return '';

  const str = String(value);

  const clean = str.replace(/[^\d]/g, '');

  if (clean === '') return '';

  const number = parseInt(clean, 10);

  if (isNaN(number)) return '';

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(number);
}

export function pesosToNumber(value) {
  if (!value) return 0;

  const str = String(value);
  const clean = str.replace(/[^\d]/g, '');
  return parseInt(clean || '0', 10);
}

export function formatEnumText(value, mode = 'capitalize') {
  if (!value) return '';

  const words = value.split('_');

  switch (mode) {
    case 'uppercase':
      return words.join(' ').toUpperCase();

    case 'lowercase':
      return words.join(' ').toLowerCase();

    case 'capitalize':
    default:
      return words
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');
  }
}

export const normalizePhoneCO = (phone) => {
  if (!phone) return '';

  let digits = phone.toString().replace(/[^0-9]/g, '');

  if (digits.startsWith('57')) {
    digits = digits.slice(2);
  }

  if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  if (digits.length > 10) {
    digits = digits.slice(-10);
  }

  if (digits.length !== 10 || !digits.startsWith('3')) {
    return '';
  }

  return digits;
};

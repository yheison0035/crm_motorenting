import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatDateTime(date, pattern = "dd 'de' MMMM yyyy") {
  if (!date) return '---';

  try {
    const dateOnly = date.split('T')[0];

    const [year, month, day] = dateOnly.split('-');

    const safeDate = new Date(Number(year), Number(month) - 1, Number(day));

    return format(safeDate, pattern, { locale: es });
  } catch {
    return '---';
  }
}

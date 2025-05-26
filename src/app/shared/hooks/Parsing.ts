import { FieldDefinition } from '../components/models/field-definition';

/**
 * @param field
 */
export function getDefaultValue(field: FieldDefinition): unknown {
  const raw = field.defaultValue;
  let type = (field.entityType ?? field.type ?? '').toLowerCase();

  if (
    raw === undefined ||
    raw === null ||
    raw === '' ||
    raw === 'null' ||
    raw === 'undefined'
  ){
    return null;
  }

  if (raw === 'date()' || raw === 'new Date().toISOString()' || raw === 'today()' || raw === 'now()') {
    return new Date().toISOString().substring(0, 10);
  }

  const value = String(raw).replace(/&quot;/g, '');

  if (type === 'boolean') {
    if (value === '1' || value === 'true') return true;
    if (value === '0' || value === 'false') return false;
    return null;
  }

  if (type === 'number') {
    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  if (type === 'string') return value;

  if (type === 'date') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date.toISOString();
  }

  return value;
}

/**
 * @param date
 */
export function toDatetimeLocalString(date: string | Date | null | undefined): string | null {
  if (!date) return null;
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return null;

  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

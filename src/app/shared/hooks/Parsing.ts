import {FieldDefinition} from '../components/models/field-definition';

export function getDefaultValue(field: FieldDefinition): any {
  var value = field.defaultValue;

  if (value === undefined) {
    return null;
  }

  value = value.replace(/&quot;/g, '');

  if (value === undefined ||
    value === null ||
    value === '' ||
    value === "" ||
    value === 'null' ||
    value === 'undefined') {
    if (field.type === 'boolean') return false;
    if (field.type === 'number') return 0;
    if (field.type === 'string') return '';
    return null;
  }

  if (field.type === 'boolean') {
    if (value === '1' || value === 'true') return true;
    if (value === '0' || value === 'false') return false;
    return value;
  }

  if (field.type === 'number') return parseFloat(value);
  if (field.type === 'string') return value.toString();

  return value;
}


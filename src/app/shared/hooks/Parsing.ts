import {FieldDefinition} from '../components/models/field-definition';

export function getDefaultValue(field: FieldDefinition): any {

  const value = field.defaultValue;

  if (value === undefined || value === null) {
    return null;
  }

  if( field.type === 'boolean') {
    if (value === '1' || value === 'true') {
      return true;
    } else if (value === '0' || value === 'false') {
      return false;
    } else {
      return field.defaultValue === '1' || field.defaultValue === 'true';
    }
  }

  return value;
}

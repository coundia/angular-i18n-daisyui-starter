export type FieldDefinition = {
  name: string;
  displayName: string;
  type?: FieldType;
  entityType?: string;
  nullable?: boolean;
  relation?: string;
  defaultValue?: string;
  options?: { value: string; label: string }[];
};


export type FieldType = 'string' | 'boolean' | 'badge' | 'date' | 'select' | 'textarea' | 'number';

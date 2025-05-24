export type TypeCategory = 'IN' | 'OUT';

export interface Category {
  id: string;
  name: string;
  typeCategoryRaw: TypeCategory;
  details: string;
  isActive: boolean;
  updatedAt?: string;
  reference: string;
  createdBy: string;
  tenant: string;
}

export type TypeCategory = 'TYPE1' | 'TYPE2';

export interface Category {
    id: string;
    name: string;
    typeCategoryRaw: string;
    details?: string;
    isActive: boolean;
    updatedAt?: string;
    reference?: string;
}


export type TypeSetting = 'TYPE1' | 'TYPE2';

export interface Setting {
    id: string;
    name: string;
    value: string;
    locale: string;
    details?: string;
    isActive: boolean;
    updatedAt?: string;
    reference?: string;
}


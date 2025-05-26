export type TypeSetting = 'IN' | 'OUT';

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


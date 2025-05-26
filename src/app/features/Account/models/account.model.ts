export type TypeAccount = 'TYPE1' | 'TYPE2';

export interface Account {
    id: string;
    name: string;
    details?: string;
    currency: string;
    currentBalance: number;
    previousBalance: number;
    isActive: boolean;
    updatedAt?: string;
    reference?: string;
}


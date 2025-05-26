export type TypeTransaction = 'TYPE1' | 'TYPE2';

export interface Transaction {
    id: string;
    amount: number;
    name: string;
    details?: string;
    isActive: boolean;
    account?: string;
    category?: string;
    typeTransactionRaw: string;
    dateTransaction?: string;
    updatedAt?: string;
    reference?: string;
}


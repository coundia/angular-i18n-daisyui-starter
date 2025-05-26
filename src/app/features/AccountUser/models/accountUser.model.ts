export type TypeAccountUser = 'TYPE1' | 'TYPE2';

export interface AccountUser {
    id: string;
    name: string;
    account?: string;
    username: string;
    details?: string;
    isActive: boolean;
    updatedAt?: string;
    reference?: string;
}


export type TypeChat = 'TYPE1' | 'TYPE2';

export interface Chat {
    id: string;
    messages: string;
    responses?: string;
    responsesJson?: string;
    state?: string;
    account?: string;
    updatedAt?: string;
    reference?: string;
}


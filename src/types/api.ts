export type PaymentMethod = 'online' | 'offline';

export interface ICheckoutForm {
    payment?: PaymentMethod;
    address?: string;
    phone?: string;
    email?: string;
}

export interface ICheckoutData extends ICheckoutForm {
    items: string[];
    total: number;
}

export interface ICheckoutSubmission extends ICheckoutData {
    payment: PaymentMethod;
    address: string;
    email: string;
    phone: string;
}

export interface ICheckoutResult {
    id: string;
    total: number;
}

export type CheckoutFormErrors = Partial<Record<keyof ICheckoutForm, string>>;

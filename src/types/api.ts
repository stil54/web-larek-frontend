export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface OrderRequest {
    payment: 'card' | 'cash';
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export interface OrderResponse {
    id: string;
    total: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}
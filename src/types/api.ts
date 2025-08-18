// Ответ сервера для любых запросов
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}

// Товар
export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

// Данные заказа
export interface Order {
    payment: 'online' | 'offline';
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}
// Описывает структуру данных товара, получаемых с сервера при запросе каталога
export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

// Данные, которые отправляются на сервер при оформлении заказа
export interface OrderRequest {
    payment: 'card' | 'cash';
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

// Данные, которые возвращает сервер после успешного оформления заказа.
export interface OrderResponse {
    id: string;
    total: number;
}

// Обёртка для всех ответов API
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}
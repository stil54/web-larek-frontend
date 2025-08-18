import { Product, Order } from './api';

// Элемент корзины
export interface CartItem {
    product: Product;
    quantity: number;
}

// Глобальное состояние приложения
export interface AppState {
    catalog: Product[];
    cart: CartItem[];
    order: Partial<Order>;
}
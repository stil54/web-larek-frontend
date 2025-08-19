import { Product, OrderRequest } from './api';

// Описывает товар в корзине с учётом количества.
export interface CartItem {
    product: Product;
    quantity: number;
}

// Глобальное состояние приложения
export interface AppState {
    catalog: Product[];              // Все товары из каталога
    cart: CartItem[];               // Товары в корзине
    order: Partial<OrderRequest>;   // Данные заказа
}
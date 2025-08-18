import { Product, OrderRequest } from './api';

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface AppState {
    catalog: Product[];
    cart: CartItem[];
    order: Partial<OrderRequest>;
}
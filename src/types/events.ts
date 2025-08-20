import { IProduct, ICartItem, ICartState } from './models';
import { ICheckoutSubmission, ICheckoutResult } from './api';

export interface IEventHandlers {
    onClick: (event: MouseEvent) => void;
}

export interface AppEventMap {
    // Продукты
    'products:loaded': IProduct[];
    'product:select': { product: IProduct };
    
    // Корзина
    'cart:add': { productId: string };
    'cart:remove': { productId: string };
    'cart:update': ICartState;
    'cart:clear': void;
    
    // Заказ
    'order:start': void;
    'order:submit': ICheckoutSubmission;
    'order:success': ICheckoutResult;
    'order:error': { error: string };
    
    // UI события
    'modal:open': { type: string };
    'modal:close': { type: string };
}

export type EventType = keyof AppEventMap;
export type EventHandler<T extends EventType> = (data: AppEventMap[T]) => void;
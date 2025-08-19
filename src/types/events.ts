import { OrderRequest, Product } from './api';
import { CartItem } from './models';

// Определяет все возможные события в приложении.
export type EventName =
  | 'cart:update'
  | 'order:submit'
  | 'product:open';

// Связывает каждое событие с конкретными данными.
export interface EventPayload {
  'cart:update': CartItem[];
  'order:submit': OrderRequest;
  'product:open': Product;
}
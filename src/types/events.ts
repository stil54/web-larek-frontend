import { Product, Order } from './api';

// Все возможные события
export type EventName = 
  | 'catalog:update' 
  | 'cart:add' 
  | 'cart:remove'
  | 'order:submit';

// Данные для каждого события
export interface EventData {
  'catalog:update': Product[];
  'cart:add': { product: Product };
  'cart:remove': { productId: string };
  'order:submit': Order;
}
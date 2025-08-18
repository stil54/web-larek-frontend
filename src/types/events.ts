import { OrderRequest, Product } from './api';
import { CartItem } from './models';

export type EventName =
  | 'cart:update'
  | 'order:submit'
  | 'product:open';

export interface EventPayload {
  'cart:update': CartItem[];
  'order:submit': OrderRequest;
  'product:open': Product;
}
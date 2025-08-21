import { IProduct } from "../../types";
import { IEvents } from "../base/events";

// Интерфейс модели корзины
export interface IShoppingCartModel {
  products: IProduct[];
  getItemCount: () => number;
  getTotal: () => number;
  addProduct(data: IProduct): void;
  removeProduct(productId: string): void;
  clear(): void;
  hasProduct(productId: string): boolean;
}

export interface ICartItem {
  productId: string;
  quantity: number;
}

// Класс модели корзины
export class ShoppingCartModel implements IShoppingCartModel {
  protected _products: IProduct[];
  protected _cartItems: ICartItem[] = [];
  protected _events: IEvents;

  constructor(events: IEvents) {
    this._products = [];
    this._events = events;
  }

  get products(): IProduct[] {
    return this._products;
  }

  hasProduct(productId: string): boolean {
    return this._cartItems.some(item => item.productId === productId);
  }

  getItemCount(): number {
    return this._cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotal(): number {
    return this._cartItems.reduce((sum, item) => {
      const product = this._products.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
  }

  addProduct(item: IProduct): void {
    const existingItem = this._cartItems.find(cartItem => cartItem.productId === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this._cartItems.push({ productId: item.id, quantity: 1 });
      this._products.push(item);
    }

    this._events.emit('cart:changed', {
      products: this.products,
      count: this.getItemCount(),
      total: this.getTotal()
    });
  }

  removeProduct(productId: string): void {
    const itemIndex = this._cartItems.findIndex(cartItem => cartItem.productId === productId);
    if (itemIndex !== -1) {
      this._cartItems.splice(itemIndex, 1);
      this._products = this._products.filter(product => product.id !== productId);
      this._events.emit('cart:changed', {
        products: this.products,
        count: this.getItemCount(),
        total: this.getTotal()
      });
      this._events.emit('cart:item:state', {
        productId: productId,
        inCart: false
      });
    }
  }

  clear(): void {
    this._products = [];
    this._cartItems = [];
    this._events.emit('cart:changed', { products: this.products, count: 0, total: 0 });
  }
}
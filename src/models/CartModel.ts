import { Product, CartItem } from '../types';

import { ApiResponse } from '../types/api';

export class CartModel {
    private items: CartItem[] = [];
    private updateCallbacks: ((items: CartItem[]) => void)[] = [];

    onUpdate(callback: (items: CartItem[]) => void) {
        this.updateCallbacks.push(callback);
    }

    addItem(product: Product) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ product, quantity: 1 });
        }
        this.notifyUpdate();
    }

    removeItem(productId: string) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.notifyUpdate();
    }

    private notifyUpdate() {
        this.updateCallbacks.forEach(callback => callback(this.items));
    }

    getItems(): CartItem[] {
        return this.items;
    }
}
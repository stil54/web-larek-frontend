import { Product } from './Product';

export class Basket {
    private items: Product[] = [];

    addItem(product: Product): void {
        this.items.push(product);
    }

    removeItem(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    getItems(): Product[] {
        return this.items;
    }

    getTotalPrice(): number {
        return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
    }

    clear(): void {
        this.items = [];
    }
}
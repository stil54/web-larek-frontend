import { ApiClient } from '../api/ApiClient';
import { Product } from '../models/Product';
import { EventEmitter } from './EventEmitter';
import { CardView } from '../views/Card';

export class AppController {
    private products: Product[] = [];
    private api: ApiClient;
    private cardView: CardView;

    constructor() {
        this.api = new ApiClient();
        this.cardView = new CardView();
        this.initEventListeners();
    }

    private renderProducts(): void {
        const container = document.querySelector('.products-container');
        if (!container) return;

        container.innerHTML = '';
        this.products.forEach(product => {
            const card = this.cardView.render(product);
            container.appendChild(card);
        });
    }

    public async loadProducts(): Promise<void> {
        try {
            const response = await this.api.getProductList();
            if (response.success) {
                this.products = response.data;
                this.renderProducts();
                EventEmitter.emit('products:loaded');
            }
        } catch (error) {
            console.error('Error loading products:', error);
            EventEmitter.emit('error', { message: 'Failed to load products' });
        }
    }

    private initEventListeners(): void {
        EventEmitter.on('products:loaded', () => this.renderProducts());
    }
}
import { ApiClient } from '../api/ApiClient';
import { Product } from '../models/Product';
import { EventEmitter } from './EventEmitter';
import { CardView } from '../views/Card';
import { BasketView } from '../views/Basket';
import { ModalView } from '../views/Modal';

export class App {
    private products: Product[] = [];
    private basket: Product[] = [];
    private apiClient: ApiClient;
    private cardView: CardView;
    private basketView: BasketView;
    private modalView: ModalView;

    constructor() {
        this.apiClient = new ApiClient();
        this.cardView = new CardView();
        this.basketView = new BasketView();
        this.modalView = new ModalView();

        this.initEventListeners();
        this.loadProducts();
    }

    private async loadProducts(): Promise<void> {
        try {
            const response = await this.apiClient.getProductList();
            if (response.success) {
                this.products = response.data;
                this.renderCatalog();
                EventEmitter.emit('products:loaded');
            }
        } catch (error) {
            console.error('Failed to load products:', error);
            EventEmitter.emit('error', { message: 'Failed to load products' });
        }
    }

    private renderCatalog(): void {
        const gallery = document.querySelector('.gallery');
        if (!gallery) return;

        gallery.innerHTML = '';
        this.products.forEach(product => {
            const card = this.cardView.renderCatalog(product);
            card.addEventListener('click', () => this.openProductModal(product));
            gallery.appendChild(card);
        });
    }

    private openProductModal(product: Product): void {
        const modalContent = this.cardView.renderProductModal(product);
        this.modalView.open(modalContent);
    }

    private updateBasket(): void {
        const basketCounter = document.querySelector('.header__basket-counter');
        if (basketCounter) {
            basketCounter.textContent = this.basket.length.toString();
        }
    }

    private initEventListeners(): void {
        EventEmitter.on('product:add-to-basket', (product: Product) => {
            this.basket.push(product);
            this.updateBasket();
        });

        EventEmitter.on('basket:open', () => {
            const basketContent = this.basketView.render(this.basket);
            this.modalView.open(basketContent);
        });

        EventEmitter.on('order:submit', (orderData: any) => {
            this.processOrder(orderData);
        });
    }

    private async processOrder(orderData: any): Promise<void> {
        try {
            const response = await this.apiClient.submitOrder({
                ...orderData,
                items: this.basket.map(item => item.id)
            });

            if (response.success) {
                this.basket = [];
                this.updateBasket();
                this.showOrderSuccess();
            }
        } catch (error) {
            console.error('Order failed:', error);
        }
    }

    private showOrderSuccess(): void {
        const successContent = this.basketView.renderOrderSuccess();
        this.modalView.open(successContent);
    }
}
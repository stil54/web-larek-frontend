import { CartModel } from '../models/CartModel';
import { CartItem } from '../types';

export class CartView {
    private cartElement: HTMLElement;
    private counterElement: HTMLElement;

    constructor(private cartModel: CartModel) {
        this.cartElement = document.getElementById('cart')!;
        this.counterElement = document.getElementById('cart-counter')!;
        this.cartModel.onUpdate(items => this.render(items));
    }

    private render(items: CartItem[]) {
        this.counterElement.textContent = items.length.toString();

        this.cartElement.innerHTML = items.map(item => `
            <div class="cart-item">
                <span>${item.product.title} × ${item.quantity}</span>
                <button data-id="${item.product.id}" class="remove-button">×</button>
            </div>
        `).join('');

        this.cartElement.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', () => {
                this.cartModel.removeItem(button.getAttribute('data-id')!);
            });
        });
    }
}
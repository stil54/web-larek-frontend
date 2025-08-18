import { Product } from '../types/api';


export class ProductModal {
    private constructor(
        private readonly modalElement: HTMLElement,
        private readonly closeButton: HTMLElement,
        private readonly addToCartCallback: (product: Product) => void
    ) {
        this.setupEvents();
    }

    public static create(
        addToCartCallback: (product: Product) => void,
        modalSelector = '.modal',
        closeButtonSelector = '.modal__close'
    ): ProductModal | null {
        const modalElement = document.querySelector(modalSelector);
        const closeButton = modalElement?.querySelector(closeButtonSelector);

        if (!modalElement || !closeButton) {
            console.error(`Modal elements not found (${modalSelector}, ${closeButtonSelector})`);
            return null;
        }

        return new ProductModal(
            modalElement as HTMLElement,
            closeButton as HTMLElement,
            addToCartCallback
        );
    }

    public open(product: Product): void {
        this.render(product);
        this.modalElement.style.display = 'block';
    }

    private render(product: Product): void {
        this.modalElement.querySelector('.card__title')!.textContent = product.title;
        this.modalElement.querySelector('.card__price')!.textContent = `${product.price} ₽`;

        const buyButton = this.modalElement.querySelector('.button')!;
        buyButton.addEventListener('click', () => {
            this.addToCartCallback(product);
            this.close();
        });
    }

    private close(): void {
        this.modalElement.style.display = 'none';
    }

    private setupEvents(): void {
        this.closeButton.addEventListener('click', () => this.close());
        this.modalElement.addEventListener('click', (e) => {
            if (e.target === this.modalElement) this.close();
        });
    }
}
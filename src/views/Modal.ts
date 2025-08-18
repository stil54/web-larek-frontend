import { Basket } from '../models/Basket';

export class BasketView {
    static render(basket: Basket): HTMLElement {
        const template = document.getElementById('basket') as HTMLTemplateElement;
        const basketElement = template.content.cloneNode(true) as HTMLElement;
        return basketElement;
    }
}
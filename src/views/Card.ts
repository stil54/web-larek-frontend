// src/view/CardView.ts
import { Product } from '../models/Product';

export class CardView {
  /**
   * Рендерит карточку товара для каталога
   */
  public renderCatalog(product: Product): HTMLElement {
    const template = document.getElementById('card-catalog-template') as HTMLTemplateElement;
    const card = template.content.cloneNode(true) as HTMLElement;
    
    // Заполняем карточку данными
    const titleElement = card.querySelector('.card__title');
    if (titleElement) titleElement.textContent = product.title;
    
    const priceElement = card.querySelector('.card__price');
    if (priceElement) priceElement.textContent = `${product.price} синапсов`;
    
    return card;
  }

  /**
   * Рендерит карточку для корзины (если нужен)
   */
  public renderBasketItem(product: Product): HTMLElement {
    // аналогичная реализация для корзины
  }
}
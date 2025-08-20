import { ProductItemView } from "./ProductItemView";
import { IEventHandlers, IProduct } from "../../types";
import { IEvents } from "../base/events";

// Интерфейс для представления детальной информации о товаре
export interface IProductDetailsView {
  description: HTMLElement;
  addToCartButton: HTMLElement;
  render(data: IProduct): HTMLElement;
}

// Класс для представления детальной карточки товара
export class ProductDetailsView extends ProductItemView implements IProductDetailsView {
  description: HTMLElement;
  addToCartButton: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IEventHandlers) {
    super(template, events, actions);
    this.description = this._cardElement.querySelector('.card__text');
    this.addToCartButton = this._cardElement.querySelector('.card__button');

    // Обработка добавить в корзину
    this.addToCartButton.addEventListener('click', () => { 
      this.events.emit('cart:item:add');
    });
  }

  // Определение доступности товара
  isForSale(data: IProduct) {
    if (data.price) {
      return 'Купить';
    } else {
      this.addToCartButton.setAttribute('disabled', 'true');
      return 'Не продается';
    }
  }

  // Отрисовываю карточку товара
  render(data: IProduct): HTMLElement {
    this._cardCategory.textContent = data.category;
    this.cardCategory = data.category;
    this._cardTitle.textContent = data.title;
    this._cardImage.src = data.image;
    this._cardImage.alt = this._cardTitle.textContent;
    this._cardPrice.textContent = this.setPrice(data.price);
    this.description.textContent = data.description;
    this.addToCartButton.textContent = this.isForSale(data);
    return this._cardElement;
  }
}
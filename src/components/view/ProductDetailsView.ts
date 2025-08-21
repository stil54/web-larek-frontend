import { ProductItemView } from "./ProductItemView";
import { IEventHandlers, IProduct } from "../../types";
import { IEvents } from "../base/events";

export interface IProductDetailsView {
  description: HTMLElement;
  addToCartButton: HTMLElement;
  render(data: IProduct, isInCart: boolean): HTMLElement;
}

export class ProductDetailsView extends ProductItemView implements IProductDetailsView {
  description: HTMLElement;
  addToCartButton: HTMLElement;
  private currentProduct: IProduct | null = null;
  private isInCart: boolean = false;

  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IEventHandlers) {
    super(template, events, actions);
    this.description = this._cardElement.querySelector('.card__text');
    this.addToCartButton = this._cardElement.querySelector('.card__button');

    // Обработка добавить в корзину
    this.addToCartButton.addEventListener('click', () => {
      if (this.currentProduct) {
        if (this.isInCart) {
          // Удаляем товар
          this.events.emit('cart:item:remove', { productId: this.currentProduct.id });
        } else {
          // Добавляем товар
          this.events.emit('cart:item:add', { product: this.currentProduct });
        }
      }
    });

    // Слушаем изменения корзины для обновления состояния
    this.events.on('cart:changed', () => {
      if (this.currentProduct) {
        // Запрашиваем актуальное состояние
        this.events.emit('cart:check:item', { productId: this.currentProduct.id });
      }
    });

    // Обновляем состояние кнопки
    this.events.on('cart:item:state', (data: { productId: string; inCart: boolean }) => {
      if (this.currentProduct && this.currentProduct.id === data.productId) {
        this.updateButtonState(data.inCart);
      }
    });
  }

  // Обновление состояния кнопки
  private updateButtonState(isInCart: boolean): void {
    this.isInCart = isInCart;

    if (this.currentProduct && this.currentProduct.price) {
      if (isInCart) {
        this.addToCartButton.textContent = 'Удалить';
      } else {
        this.addToCartButton.textContent = 'В корзину';
      }
    }
  }

  // Отрисовываю карточку товара
  render(data: IProduct, isInCart: boolean = false): HTMLElement {
    this.currentProduct = data;
    this.isInCart = isInCart;

    this._cardCategory.textContent = data.category;
    this.cardCategory = data.category;
    this._cardTitle.textContent = data.title;
    this._cardImage.src = data.image;
    this._cardImage.alt = this._cardTitle.textContent;
    this._cardPrice.textContent = this.setPrice(data.price);
    this.description.textContent = data.description;

    // Устанавливаем начальное состояние кнопки
    this.updateButtonState(isInCart);

    if (!data.price) {
      this.addToCartButton.setAttribute('disabled', 'true');
      this.addToCartButton.textContent = 'Не продается';
    } else {
      this.addToCartButton.removeAttribute('disabled');
    }

    return this._cardElement;
  }
}
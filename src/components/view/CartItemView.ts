import { IEventHandlers, IProduct } from "../../types";
import { IEvents } from "../base/events";
import { Component } from "../base/Component";

export class CartItemView extends Component<IProduct> {
  protected indexEl: HTMLElement;
  protected titleEl: HTMLElement;
  protected priceEl: HTMLElement;
  protected removeButton: HTMLButtonElement;
  private product: IProduct;

  constructor(
    template: HTMLTemplateElement,
    protected events: IEvents,
    actions?: IEventHandlers
  ) {
    const element = template.content.querySelector(".basket__item")!.cloneNode(true) as HTMLElement;
    super(element);

    this.indexEl = element.querySelector(".basket__item-index")!;
    this.titleEl = element.querySelector(".card__title")!;
    this.priceEl = element.querySelector(".card__price")!;
    this.removeButton = element.querySelector(".basket__item-delete")!;

    this.removeButton.addEventListener("click", () => {
      this.events.emit("cart:item:remove", { productId: this.product.id });
    });
  }

  private formatPrice(price: number | null): string {
    return price === null ? "Бесценно" : `${price} синапсов`;
  }

  renderCartItem(data: IProduct, index: number): HTMLElement {
    this.product = data;
    this.setText(this.indexEl, String(index));
    this.setText(this.titleEl, data.title);
    this.setText(this.priceEl, this.formatPrice(data.price));
    return this.container;
  }
}

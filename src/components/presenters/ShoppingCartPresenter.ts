import { IEvents } from "../base/events";
import { ShoppingCartModel } from "../model/ShoppingCartModel";
import { ProductCollectionModel } from "../model/ProductCollectionModel";
import { ShoppingCartView } from "../view/ShoppingCartView";
import { ModalView } from "../view/ModalView";
import { IProduct } from "../../types";

export class ShoppingCartPresenter {
  constructor(
    private events: IEvents,
    private cartModel: ShoppingCartModel,
    private catalogModel: ProductCollectionModel,
    private cartView: ShoppingCartView,
    private cartItemTemplate: HTMLTemplateElement,
    private modal: ModalView
  ) {
    // Добавление товара в корзину
    this.events.on("cart:item:add", (data: { product: IProduct }) => {
      if (!this.cartModel.hasProduct(data.product.id)) {
        this.cartModel.addProduct(data.product);
        this.cartView.renderHeaderCartCounter(this.cartModel.getItemCount());
      }
      // this.modal.close();
    });

    // Открытие корзины
    this.events.on("cart:open", () => {
      this.cartView.renderTotal(this.cartModel.getTotal());
      this.cartView.updateCartItems(this.cartModel.products, this.cartItemTemplate);
      this.events.emit("modal:open", this.cartView.render());
    });

    // Удаление товара из корзины
    this.events.on("cart:item:remove", (data: { productId: string }) => {
      this.cartModel.removeProduct(data.productId);
      this.cartView.renderHeaderCartCounter(this.cartModel.getItemCount());
      this.events.emit("cart:item:state", {
        productId: data.productId,
        inCart: false
      });
    });

    // Обновление корзины после изменений
    this.events.on("cart:changed", (data: { products: IProduct[]; count: number; total: number }) => {
      this.cartView.renderHeaderCartCounter(data.count);
      this.cartView.renderTotal(data.total);
      this.cartView.updateCartItems(data.products, this.cartItemTemplate);
    });

    // Обработчик для проверки состояния товара
    this.events.on("cart:check:item", (data: { productId: string }) => {
      const isInCart = this.cartModel.hasProduct(data.productId);
      this.events.emit("cart:item:state", {
        productId: data.productId,
        inCart: isInCart
      });
    });
  }
}
import { IEvents } from "../base/events";
import { CheckoutModel } from "../model/CheckoutModel";
import { ShoppingCartModel } from "../model/ShoppingCartModel";
import { WebLarekApi } from "../services/WebLarekApi";
import { CheckoutPaymentView } from "../view/CheckoutPaymentView";
import { CheckoutContactsView } from "../view/CheckoutContactsView";
import { ModalView } from "../view/ModalView";
import { ICheckoutForm, PaymentMethod } from "../../types/api";
import { ShoppingCartView } from "../view/ShoppingCartView";
import { OrderSuccessView } from "../view/OrderSuccessView";

export class CheckoutPresenter {
  private successView: OrderSuccessView;

  constructor(
    private events: IEvents,
    private checkoutModel: CheckoutModel,
    private cartModel: ShoppingCartModel,
    private api: WebLarekApi,
    private paymentView: CheckoutPaymentView,
    private contactsView: CheckoutContactsView,
    private successTemplate: HTMLTemplateElement,
    private modal: ModalView,
    private cartView?: ShoppingCartView
  ) {
    // Инициализируем OrderSuccessView сразу в конструкторе
    this.successView = new OrderSuccessView(successTemplate);

    // Выбор способа оплаты
    this.events.on("checkout:step:payment", () => {
      this.checkoutModel.items = this.cartModel.products.map((item) => item.id);
      this.events.emit("checkout:payment:show");
    });

    // Показ формы оплаты
    this.events.on("checkout:payment:show", () => {
      this.paymentView.showPayment();
    });

    // Валидацию payment метода
    this.events.on("checkout:payment:select", (button: HTMLButtonElement) => {
      const paymentValue = button.name;
      // Валидируем, что значение является допустимым PaymentMethod
      if (paymentValue === 'online' || paymentValue === 'offline') {
        this.checkoutModel.payment = paymentValue as PaymentMethod;
      } else {
        console.warn('Invalid payment method:', paymentValue);
        // Устанавливаем значение по умолчанию
        this.checkoutModel.payment = 'online';
      }
    });

    this.events.on("checkout:address:change", (data: { field: string; value: string }) => {
      this.checkoutModel.setAddress(data.field, data.value);
    });

    this.events.on("checkout:validation:address", (errors: Partial<ICheckoutForm>) => {
      const { address, payment } = errors;
      this.paymentView.valid = !address && !payment;
      this.paymentView.formErrors.textContent = Object.values({ address, payment })
        .filter(Boolean)
        .join("; ");
    });

    // форма контактов
    this.events.on("checkout:step:contacts", () => {
      this.checkoutModel.total = this.cartModel.getTotal();
      this.events.emit("checkout:contacts:show");
    });

    // Показ формы контактов
    this.events.on("checkout:contacts:show", () => {
      this.contactsView.showContacts();
    });

    this.events.on("checkout:contacts:change", (data: { field: string; value: string }) => {
      this.checkoutModel.setContactData(data.field, data.value);
    });

    // Валидация контактов
    this.events.on("checkout:validation:contacts", (errors: Partial<ICheckoutForm>) => {
      const { email, phone } = errors;
      this.contactsView.valid = !email && !phone;
      this.contactsView.formErrors.textContent = Object.values({ phone, email })
        .filter(Boolean)
        .join("; ");
    });

    // Обработка отправки
    this.events.on("checkout:process:submit", () => {
      const isValid = this.checkoutModel.validateContactsStep();

      if (!isValid) {
        return;
      }

      this.api
        .submitOrder(this.checkoutModel.getOrderData())
        .then(() => {
          this.cartModel.clear();
          const total = this.checkoutModel.total;

          const content = this.successView.render({ total });
          this.modal.content = content;
          this.modal.render();

          this.successView.setCloseHandler(() => {
            this.modal.close();
            this.events.emit("order:success:close");
          });

          // Счетчик корзины
          if (this.cartView) {
            this.cartView.renderHeaderCartCounter(0);
          } else {
            this.events.emit("cart:counter:update", { count: 0 });
          }

          // Очистка данных после успешного заказа
          this.checkoutModel.clear();
        })
        .catch((error) => console.error("Ошибка при отправке заказа:", error));
    });

    this.events.on("order:success:close", () => {
      this.modal.close();
    });
  }
}
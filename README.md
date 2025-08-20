# Проектная работа "Веб-ларек"

## Описание проекта

Web-ларёк — это учебный интернет-магазин с товарами для веб-разработчиков. Пользователь может просматривать товары, добавлять их в корзину и оформлять заказ.

Проект реализован на основе паттерна **MVP (Model-View-Presenter)** с акцентом на слабую связанность и масштабируемость.

---

## Установка и запуск

### Установка зависимостей

```bash
npm install
# или
yarn
```

### Запуск проекта в режиме разработки

```bash
npm run start
# или
yarn start
```

### Сборка проекта

```bash
npm run build
# или
yarn build
```

---

## Архитектура проекта

Проект построен по паттерну **MVP (Model-View-Presenter)**:

### Model (Модель)

Модели управляют состоянием данных и их валидацией:

- `ProductCollectionModel` — список товаров и текущий выбранный товар.
- `ShoppingCartModel` — товары в корзине, итоговая сумма и очистка.
- `CheckoutModel` — данные заказа, пошаговая валидация и сбор информации.

### View (Представление)

Компоненты интерфейса, реагирующие на действия пользователя:

- `ProductItemView` — карточка товара.
- `ProductDetailsView` — карточка с подробностями и кнопкой покупки.
- `ShoppingCartView` — отображение модального окна корзины.
- `CartItemView` — отображение одного товара в списке корзины.
- `CheckoutPaymentView` — форма выбора оплаты.
- `CheckoutContactsView` — форма ввода контактной информации.
- `OrderSuccessView` — окно успешного оформления.
- `ModalView` — универсальное модальное окно.

### Presenter (Презентер)

Промежуточное звено между Model и View:

- `CatalogPresenter` — отображение карточек товаров, открытие подробностей.
- `ShoppingCartPresenter` — управление корзиной.
- `CheckoutPresenter` — оформление заказа, валидация и отправка.

### Сервисы

- `WebLarekApi` — взаимодействие с API: получение списка товаров и отправка заказа.
- `Api` — базовый HTTP-клиент.

---

## Структура проекта

```
src/
├── components/
│   ├── base/                # Базовые классы
│   ├── Model/               # Модели данных
│   ├── View/                # Интерфейсные компоненты
│   ├── Presenters/          # Бизнес-логика
│   ├── Services/            # API-клиенты
├── types/                   # Типы и интерфейсы
├── utils/                   # Утилиты и константы
├── pages/                   # HTML
├── scss/                    # Стили
├── index.ts                 # Инициализация и связывание всех слоёв
```

---

## View-компоненты

### `ProductItemView`

**Назначение**: отображение карточки товара.

**Методы**:

- `render(data: IProduct): HTMLElement` — отрисовка товара.
- `set cardCategory(value: string): void` — установка категории с CSS-классом.
- `setPrice(value: number | null): string` — форматирование цены.

---

### `ProductDetailsView`

**Наследуется от**: `ProductItemView`.

**Дополнительно**:

- `addToCartButton: HTMLElement` — кнопка "Купить".
- `description: HTMLElement` — описание товара.

**Методы**:

- `render(data: IProduct): HTMLElement`
- `isForSale(data: IProduct): string` — определяет доступность товара.

---

### `ShoppingCartView`

**Назначение**: отображение модального окна корзины.

**Методы**:

- `set items(items: HTMLElement[])`
- `renderHeaderCartCounter(value: number)`
- `renderTotal(total: number)`
- `render(): HTMLElement`

**Элементы**:

- `cartList` — список товаров.
- `checkoutButton` — кнопка оформления.
- `headerCartCounter` — счетчик в шапке.

---

### `CartItemView`

**Назначение**: отображение одного товара в корзине.

**Методы**:

- `render(data: IProduct, index: number): HTMLElement`

**Элементы**:

- `title`, `price`, `removeButton`, `index`

---

### `CheckoutPaymentView`

**Назначение**: форма выбора способа оплаты.

**Методы**:

- `set paymentSelection(value: string)`
- `set valid(value: boolean)`
- `render()`

**Особенности**:

- Кнопки оплаты переключаются по клику.

---

### `CheckoutContactsView`

**Назначение**: форма ввода email и телефона.

**Методы**:

- `set valid(value: boolean)`
- `render()`
- обрабатывает submit формы и эмиттит событие `checkout:process:submit`

---

### `OrderSuccessView`

**Назначение**: отображение экрана успеха.

**Методы**:

- `render(data: { total: number }): HTMLElement`
- `setCloseHandler(callback: () => void)` — задаёт поведение при закрытии окна успеха

---

### `ModalView`

**Назначение**: универсальное модальное окно.

**Методы**:

- `set content(value: HTMLElement)`
- `open()`, `close()`
- `render()`
- `set locked(value: boolean)`

---

## Презентеры

### `CatalogPresenter`

**Задачи**:

- Получение товаров от API.
- Отображение карточек каталога.
- Открытие подробностей товара в модалке.

**Конструктор**:

```
constructor(events, model, api, templateCard, templatePreview)
```

---

### `ShoppingCartPresenter`

**Задачи**:

- Обработка событий "добавить/удалить".
- Обновление представления корзины.
- Поддержка счетчика и итога.

**Конструктор**:

```
constructor(events, cartModel, catalogModel, cartView, itemTemplate, modal)
```

---

### `CheckoutPresenter`

**Задачи**:

- Управление шагами оформления.
- Валидация форм.
- Отправка данных на сервер.
- После успешной отправки — эмиттит `checkout:success:show`

**Конструктор**:

```
constructor(events, checkoutModel, cartModel, api, paymentView, contactsView, successTemplate, modal)
```

---

## Сервисы

### Класс `Api`

Базовый HTTP-клиент.

**Методы**:

- `get(uri: string): Promise<object>`
- `post(uri: string, data: object, method = 'POST'): Promise<object>`
- `handleResponse(response: Response): Promise<object>`

---

### Класс `WebLarekApi`

Наследуется от `Api`.

**Методы**:

- `getProducts(): Promise<IProduct[]>`
- `submitOrder(order: ICheckoutSubmission): Promise<ICheckoutResult>`

---

## Типы данных

```ts
// Базовые типы товаров
interface IProduct {
	id: string;
	title: string;
	price: number | null;
	description: string;
	category: string;
	image: string;
}

// Тип для способа оплаты
export type PaymentMethod = 'online' | 'offline';

// Элемент корзины
interface ICartItem {
	productId: string;
	quantity: number;
}

// Состояние корзины
interface ICartState {
	items: ICartItem[];
	total: number;
	count: number;
}

// Форма оформления заказа
interface ICheckoutForm {
	payment?: PaymentMethod;
	address?: string;
	phone?: string;
	email?: string;
}

// Данные для отправки заказа
interface ICheckoutSubmission extends ICheckoutForm {
	payment: PaymentMethod;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];
}

// Результат оформления заказа
interface ICheckoutResult {
	id: string;
	total: number;
}

// Ошибки валидации формы
type CheckoutFormErrors = Partial<Record<keyof ICheckoutForm, string>>;
```

---

## События

Коммуникация реализована через `EventEmitter`.

**Основные события:**:

- `modal:open`, `modal:close` - управление модальными окнами
- `product:select` - выбор товара для просмотра
- `cart:add` - добавление товара в корзину
- `cart:remove` - удаление товара из корзины
- `cart:update` - обновление состояния корзины
- `checkout:step:payment` - переход к шагу оплаты
- `checkout:step:contacts` - переход к шагу контактов
- `checkout:payment:select` - выбор способа оплаты
- `checkout:validation:contacts` - валидация контактных данных
- `checkout:process:submit` - отправка заказа
- `order:success` - успешное оформление заказа

---

## Логика взаимодействия компонентов

1. index.ts связывает все компоненты и презентеры.
2. Пользователь кликает на карточку — CatalogView эмиттит product:select.
3. CatalogPresenter создаёт ProductDetailsView и открывает в модалке через modalCard:open.
4. Кнопка "В корзину" — ShoppingCartPresenter обновляет ShoppingCartModel через cart:add.
5. Открытие корзины эмиттит cart:open, отображается ShoppingCartView.
6. Кнопка "Оформить" вызывает checkout:step:payment, затем checkout:step:contacts.
7. CheckoutPresenter валидирует ввод через модель, отправляет заказ по checkout:process:submit.
8. Успешная отправка вызывает order:success, OrderSuccessView отображается в модалке.

Все шаги работают через строго типизированные события EventEmitter без прямых вызовов между слоями.

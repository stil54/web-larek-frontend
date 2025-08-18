# Проектная работа "Веб-ларек"

## Описание проекта

Web-ларёк — это учебный интернет-магазин товаров для веб-разработчиков Пользователь может просматривать товары, добавлять их в корзину и оформлять заказ.

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/api/ - Работа с API
- src/api/ApiClient.ts - Клиент для работы с сервером
- src/types/ - Типы данных
- src/types/types.ts - Основные типы приложения
- src/types/types.ts - Основные типы приложения
- src/index.ts - Точка входа

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```bash
npm install
npm run start
```

или

```bash
yarn
yarn start
```

## Сборка

```bash
npm run build
```

или

```bash
yarn build
```

## Архитектура

Проект использует классическую MVC-архитектуру с чётким разделением:

- Модели (AppState, Product, Order) – хранят данные.
- Представления (Card, Basket, Modal) – рендерят UI
- Контроллеры (логика в index.ts) – связывают модели и представления.

## Модели

Отвечают за хранение и обработку данных.

### Модель товара (ProductModel)

```ts
/**
 * Модель товара с ограничением на добавление в корзину
 */
class ProductModel {
	private _quantity: number = 0; // Текущее количество в корзине

	constructor(
		public readonly id: string,
		public title: string,
		public price: number | null,
		public category: string,
		public image: string
	) {}

	// Добавление товара (не более 1 шт каждого типа)
	addToCart(): boolean {
		if (this._quantity >= 1) return false;
		this._quantity = 1;
		return true;
	}

	// Удаление из корзины
	removeFromCart(): void {
		this._quantity = 0;
	}

	get inCart(): boolean {
		return this._quantity > 0;
	}
}
```

Функция: Хранит данные о товаре (каталог, корзина, заказ).

Конструктор:
```ts
constructor(data: {
  id: string;
  title: string;
  price: number;
  category: 'софт-скил' | 'другое' | 'хард-скил' | 'дополнительное' | 'кнопка';
  description?: string;
  image?: string;
})
```

Поля:
- id: string — уникальный идентификатор.
- title: string — название товара.
- price: number — цена в «синапсах».
- category: string — категория (софт-скил, другое и т.д.).
- description?: string — описание (опционально).
- image?: string — URL изображения (опционально).

Методы:
- getPrice(): number — возвращает цену товара.
- getCategory(): string — возвращает категорию.


### Модель заказа (OrderModel)


CartModel (Модель корзины)
```ts
/**
 * Управление состоянием корзины
 */
class CartModel {
  private items: Map<string, ProductModel> = new Map();

  constructor(private maxItemsPerProduct: number = 1) {}

  // Добавление товара с проверкой ограничений
  addItem(product: ProductModel): boolean {
    if (this.items.has(product.id) || !product.addToCart()) {
      return false;
    }
    this.items.set(product.id, product);
    return true;
  }

  // Расчет общей суммы
  get total(): number {
    return [...this.items.values()].reduce(
      (sum, item) => sum + (item.price || 0), 0
    );
  }

  // Очистка корзины
  clear(): void {
    this.items.forEach(item => item.removeFromCart());
    this.items.clear();
  }
}
```

Функция: Хранит данные о заказе (способ оплаты, адрес, контакты).

Конструктор:
```ts
constructor(data: {
  payment: 'online' | 'offline' | null;
  address: string;
  email: string;
  phone: string;
  items: string[]; // ID товаров
  total: number;
})
```

Поля:

- payment: string | null — способ оплаты (online или offline).
- address: string — адрес доставки.
- email: string — email покупателя.
- phone: string — телефон покупателя.
- items: string[] — массив ID товаров.
- total: number — итоговая сумма.

Методы:

- validate(): boolean — проверяет корректность данных (например, валидация email/телефона).
- getTotal(): number — возвращает сумму заказа.

### Модель корзины (BasketModel)
Функция: Управляет списком товаров в корзине.

Конструктор:

```ts
constructor(items: ProductModel[] = [])
```

Поля:
- items: ProductModel[] — массив товаров.
- total: number — общая стоимость.

Методы:
- addItem(item: ProductModel): void — добавляет товар.
- removeItem(id: string): void — удаляет товар по ID.
- clear(): void — очищает корзину.
- getTotal(): number — возвращает сумму.












## Типизация данных

Основные типы в `src/types/types.ts`:

```ts
interface Product {
	id: string;
	title: string;
	price: number | null;
	description: string;
	category: string;
	image: string;
}

interface ApiResponse<T> {
	success: boolean;
	data: T;
	error?: string;
}
```








## Архитектурные решения

Принципы проектирования

1. Разделение ответственности:

   - API-логика изолирована в ApiClient

   - Типы данных вынесены отдельно

2. Слабая связанность:

   - Компоненты зависят только от типов

   - Нет прямых зависимостей между слоями

3. Типобезопасность:

   - Полная типизация всех данных

   - Проверка типов при сборке

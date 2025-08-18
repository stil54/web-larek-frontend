# Проектная работа "Веб-ларек"

Интернет-магазин товаров для веб-разработчиков

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Структура проекта

src/
├── api/ # Работа с API
│ └── ApiClient.ts # Клиент для работы с сервером
├── types/ # Типы данных
│ └── types.ts # Основные типы приложения
├── scss/ # Стили
└── index.ts # Точка входа

### Архитектурные слои

## Типизация данных

### Типы данных

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

## API Клиент

Класс ApiClient (src/api/ApiClient.ts)

```ts
class ApiClient {
	// @param baseUrl - Базовый URL API
	constructor(private baseUrl: string) {}

	// Загружает список товаров

	async getProductList(): Promise<ApiResponse<Product[]>> {
		try {
			const response = await fetch(`${this.baseUrl}/product`);
			const data = await response.json();
			return { success: true, data };
		} catch (error) {
			return {
				success: false,
				data: [],
				error: error instanceof Error ? error.message : 'Unknown error',
			};
		}
	}
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

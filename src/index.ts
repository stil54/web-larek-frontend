import './scss/styles.scss';

import { ApiClient } from './api/ApiClient';
import { API_URL } from './config';

const api = new ApiClient(API_URL);

async function initApp() {
    // Загрузка товаров
    const productsResponse = await api.getProductList();

    if (productsResponse.success) {
        console.log('Товары загружены:', productsResponse.data);
    } else {
        console.error('Ошибка загрузки товаров:', productsResponse.error);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
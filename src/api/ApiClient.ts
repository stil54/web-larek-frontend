import { ApiResponse, Product, OrderRequest, OrderResponse } from '../types';
import { API_URL } from '../config';

export class ApiClient {
    private readonly baseUrl: string;

    constructor(baseUrl: string = API_URL) {
        this.baseUrl = baseUrl;
    }

    async getProductList(): Promise<ApiResponse<Product[]>> {
        return this.request<Product[]>('/product');
    }

    async getProduct(id: string): Promise<ApiResponse<Product>> {
        return this.request<Product>(`/product/${id}`);
    }

    async submitOrder(order: OrderRequest): Promise<ApiResponse<OrderResponse>> {
        return this.request<OrderResponse>('/order', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return { success: true, data };

        } catch (error) {
            console.error(`API request failed: ${endpoint}`, error);
            return {
                success: false,
                data: {} as T,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }
}
export interface IProduct {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number | null;
}

export interface ICartItem {
    productId: string;
    quantity: number;
}

export interface ICartItemDetailed extends ICartItem {
    product?: IProduct;
    price: number;
}

export interface ICartState {
    items: ICartItemDetailed[];
    total: number;
    count: number;
}

export interface IAppState {
    products: IProduct[];
    cart: ICartState;
    loading: boolean;
    error?: string;
}
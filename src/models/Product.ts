export interface IProduct {
    id: string;
    title: string;
    price: number | null;
    category: string;
    description?: string;
    image?: string;
}

export class Product implements IProduct {
    constructor(
        public id: string,
        public title: string,
        public price: number | null,
        public category: string,
        public description?: string,
        public image?: string
    ) { }
}
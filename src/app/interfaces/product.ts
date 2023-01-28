import { Category } from "./category";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    photo: string;
    category: Category;
}

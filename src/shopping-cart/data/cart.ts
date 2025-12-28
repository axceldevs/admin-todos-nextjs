import { Product } from "@/products/data/products";


export interface Cart{
    product: Product;
    quantity: number;
}
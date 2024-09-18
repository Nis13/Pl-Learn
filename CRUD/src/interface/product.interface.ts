import { ProductCategory } from "../entities/productCategory";

export interface Product {
  id?: string;
  name: string;
  price: number;
  category?: ProductCategory;
  userId?: string;
}

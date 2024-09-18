import { ProductCategory } from "../entities/productCategory.entity";

export interface Product {
  id?: string;
  name: string;
  price: number;
  category?: ProductCategory;
  userId?: string;
}

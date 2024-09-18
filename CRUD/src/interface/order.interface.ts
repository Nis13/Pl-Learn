import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";

export interface Order {
  id?: string;
  user: User;
  product: Product;
}

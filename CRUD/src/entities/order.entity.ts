import { Entity, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { BaseEntity } from "./base.entity";

@Entity("orders")
export class Order extends BaseEntity {
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToOne(() => Product, (product) => product.order)
  @JoinColumn()
  product: Product;
}

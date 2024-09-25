import { Entity, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { Base } from "./base.entity";

@Entity("order")
export class Order extends Base {
  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  user: User;

  @OneToOne(() => Product)
  @JoinColumn({
    name: "product_id",
  })
  product: Product;
}

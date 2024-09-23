import { Column, Entity, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { Category } from "./category.entity";
import { Order } from "./order.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class Product extends BaseEntity {
  @Column("varchar", { length: 200 })
  name: string;

  @Column()
  price: number;

  @ManyToMany(() => Category, (pdtCategory) => pdtCategory.products)
  @JoinTable({
    name: "product_categories",
    joinColumn: {
      name: "category_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "product_id",
      referencedColumnName: "id",
    },
  })
  category: Category[];

  @OneToOne(() => Order, (order) => order.product)
  order: Order;
}

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Category } from "./category.entity";
import { Base } from "./base.entity";
import { User } from "./user.entity";

@Entity("product")
export class Product extends Base {
  @Column("varchar", { length: 200 })
  name: string;

  @Column()
  price: number;

  @ManyToMany(() => Category)
  @JoinTable({
    name: "product_category",
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

  @ManyToOne(() => User)
  @JoinColumn({ name: "seller_id" })
  seller: User;
}

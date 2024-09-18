import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductCategory } from "./productCategory";
import { Order } from "./order";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 200 })
  name: string;

  @Column()
  price: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(() => ProductCategory, (pdtCategory) => pdtCategory.products)
  category: ProductCategory;

  @ManyToOne(() => Order, (order) => order.products)
  order: Order;
}

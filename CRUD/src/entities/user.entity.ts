import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Profile } from "./profile.entity";
import { Order } from "./order.entity";
import { BaseEntity } from "./base.entity";
@Entity()
export class User extends BaseEntity {
  @Column("varchar", { length: 200 })
  name: string;

  @Column("varchar", { length: 200 })
  email: string;

  @Column("varchar")
  password: string;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders?: Order[];
}

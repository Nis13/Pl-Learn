import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Profile } from "./profile.entity";
import { Order } from "./order.entity";
import { Base } from "./base.entity";
import { Exclude } from "class-transformer";
@Entity()
export class User extends Base {
  @Column("varchar", { length: 200 })
  name: string;

  @Column("varchar", { length: 200 })
  email: string;

  @Column("varchar")
  @Exclude()
  password: string;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn({ name: "profile_id" })
  profile: Profile;

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders?: Order[];
}

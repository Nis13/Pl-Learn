import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Profile } from "./profile.entity";
import { Order } from "./order.entity";
import { Base } from "./base.entity";
import { Exclude } from "class-transformer";
import { Role } from "../constants/role.enum";
@Entity()
export class User extends Base {
  @Column("varchar", { length: 200 })
  name: string;

  @Column("varchar", { length: 200, unique: true })
  email: string;

  @Column({ type: "enum", enum: Role, default: Role.User })
  role: Role;

  @Column("varchar")
  @Exclude()
  password: string;

  @OneToOne(() => Profile, { cascade: true })
  profile: Profile;

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders?: Order[];
}

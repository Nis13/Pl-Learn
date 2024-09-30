import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  gender: string;

  @Column("varchar", { length: 200 })
  bio: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: "user_id" })
  user: User;
}

import{
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, OneToOne, PrimaryGeneratedColumn,
  UpdateDateColumn,
} from"typeorm";
import{ Profile } from"./profile";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 200 })
  name: string;

  @Column("varchar", { length: 200 })
  email: string;

    @OneToOne(()=> Profile, {cascade:true})
    @JoinColumn()
    profile:Profile;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

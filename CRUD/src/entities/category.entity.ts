import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;
}

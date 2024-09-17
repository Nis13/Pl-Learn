import{ Column, Entity, PrimaryGeneratedColumn } from"typeorm";

@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gender: string;

    @Column("varchar", {length:200})
    bio:string;
}
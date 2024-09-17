import{  Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from"typeorm";
import{ Profile } from"./profile";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar",{length:200})
    name:string;

    @Column("varchar",{length:200})
    email:string;

    @OneToOne(()=> Profile, {cascade:true})
    @JoinColumn()
    profile:Profile;
}
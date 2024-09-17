import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar",{length:200})
    name:string;

    @Column("varchar",{length:200})
    email:string;
}
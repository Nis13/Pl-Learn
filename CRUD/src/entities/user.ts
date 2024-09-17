import {  Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar",{length: 200})
    name: string;

    @Column("varchar",{length: 200})
    email: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt:Date;
    
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt:Date;
}
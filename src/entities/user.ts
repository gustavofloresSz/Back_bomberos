import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Seccion } from "./seccion"
import bcrypt from 'bcrypt';
import { Envio } from "./envio";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    usuario:string;

    @Column()
    password:string;

    @Column()
    rol:string;
    
    @ManyToOne(() => Seccion, (seccion) => seccion.users)
    seccion: Seccion;

    @OneToMany(() => Envio, (envio) => envio.emisor)
    enviosEnviados: Envio[];

    @OneToMany(() => Envio, (envio) => envio.receptor)
    enviosRecibidos: Envio[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

}
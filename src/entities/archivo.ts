import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Envio } from "./envio";


@Entity()
export class Archivo extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    name_original: string;


    @ManyToOne(() => Envio, (envio) => envio.archivos)
    envio: Envio;
}
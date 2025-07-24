import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
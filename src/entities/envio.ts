import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Archivo } from "./archivo";

@Entity()
export class Envio extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mensaje: string;

    @CreateDateColumn()
    fecha_envio: Date;

    @ManyToOne(() => User, (user) => user.enviosEnviados)
    emisor: User;

    @ManyToOne(() => User, (user) => user.enviosRecibidos)
    receptor: User;

    @OneToMany(() => Archivo, (archivo) => archivo.envio)
    archivos: Archivo[];
}
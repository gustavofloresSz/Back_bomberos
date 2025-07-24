import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Inventario } from "./inventario";

@Entity()
export class Seccion extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, user => user.seccion)
    users: User[];

    @OneToMany(() => Inventario, inventario => inventario.seccion)
    inventario: Inventario[];
}
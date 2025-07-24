import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Seccion } from "./seccion";

@Entity()
export class Inventario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  cantidad_total: number;

  @Column({ default: 0 })
  cantidad_uso: number;

  @Column({nullable: true})
  tipo: string;

  @ManyToOne(() => Seccion, seccion => seccion.inventario)
  seccion: Seccion;

  get cantidad_disponible(): number {
    return this.cantidad_total - this.cantidad_uso;
  }

}
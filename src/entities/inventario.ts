import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  get cantidad_disponible(): number {
    return this.cantidad_total - this.cantidad_uso;
  }

}
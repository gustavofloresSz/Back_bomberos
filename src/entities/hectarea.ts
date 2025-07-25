import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hectarea extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comunidad: string;

  @Column()
  municipio: string;

  @Column('decimal', { precision: 10, scale: 2 })
  hectarea_afectada: number;

}
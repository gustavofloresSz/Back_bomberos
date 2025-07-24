import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ControlOperativo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  fecha_inicio: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin: Date;

  @Column({ nullable: true })
  responsable: string;

  @Column({ type: 'int', nullable: true })
  cuadrillas: number;

  @Column({ type: 'int', nullable: true })
  efectivo: number;

  @Column({ nullable: true })
  lugar: string;

  @Column({ type: 'int', nullable: true })
  distancia_kms: number;

  @Column({ nullable: true })
  material_equipo: string;

  @Column({ nullable: true })
  novedades: string;
}
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ControlOperativo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'date' })
  fecha_inicio: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin: Date;

  @Column({ nullable: true })
  responsable: string;

  @Column({ type: 'int', nullable: true })
  efectivo_total: number;

  @Column({ type: 'int', nullable: true })
  efectivo_uso: number;

  @Column({ nullable: true })
  lugar: string;

  @Column({ type: 'int', nullable: true })
  distancia_kms: number;

  @Column({ nullable: true })
  material_equipo: string;

  @Column({ nullable: true })
  novedades: string;

  @Column({nullable: true})
  tipo: string;
}
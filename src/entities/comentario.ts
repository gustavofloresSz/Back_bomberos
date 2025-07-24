import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comentario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  tipo_incendio: string;

  @CreateDateColumn()
  fecha_envio: Date;

  @Column({ nullable: true })
  ubicacion: string;

}
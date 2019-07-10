import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Tasacion } from "./tasacion";

@Entity()
export class Publicacion {

    constructor(init?: Partial<Publicacion>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: string

    @Column()
    fecha: Date

    @ManyToOne(type => Tasacion)
    @JoinColumn({ name: "id_tasacion" })
    tasacion: Tasacion
}
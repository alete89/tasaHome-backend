import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Partido } from "./partido";

@Entity()
export class Localidad {

    constructor(init?: Partial<Localidad>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: String

    @ManyToOne(type => Partido)
    @JoinColumn({ name: "id_partido" })
    partido: Partido
}
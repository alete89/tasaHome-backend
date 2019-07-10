import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Barrio } from "./barrio";

@Entity()
export class Hospital {

    constructor(init?: Partial<Hospital>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column("decimal", { nullable: true, precision: 20, scale: 15 })
    longitud: number

    @Column("decimal", { nullable: true, precision: 20, scale: 15 })
    latitud: number

    @Column()
    descripcion: string

    @Column({ nullable: true })
    fecha_actualizacion: Date

    @Column({ nullable: true })
    vigente: boolean

    @ManyToOne(type => Barrio)
    @JoinColumn({ name: "id_barrio" })
    barrio: Barrio
}
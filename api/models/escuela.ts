import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn } from "typeorm";
import { Barrio } from "./barrio";

@Entity()
export class Escuela {

    constructor(init?: Partial<Escuela>) {
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

    @CreateDateColumn()
    fecha_actualizacion: Date

    @Column({ default: true, nullable: true })
    vigente: boolean

    @ManyToOne(type => Barrio)
    @JoinColumn({ name: "id_barrio" })
    barrio: Barrio
}
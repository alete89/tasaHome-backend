import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Barrio } from "./barrio";

@Entity()
export class Valuacion {

    constructor(init?: Partial<Valuacion>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Barrio)
    @JoinColumn({ name: "id_barrio" })
    barrio: Barrio

    @Column({ default: true })
    vigente: boolean

    @Column()
    valor_m2: number

    @CreateDateColumn()
    fecha_actualizacion: Date
}
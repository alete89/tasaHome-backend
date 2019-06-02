import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Barrio } from "./barrio";

@Entity()
export class EspacioVerde {

    constructor(init?: Partial<EspacioVerde>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    longitud: number

    @Column({ nullable: true })
    latitud: number

    @Column({ nullable: true })
    fecha_actualizacion: Date

    @Column({ nullable: true })
    vigente: boolean

    @ManyToOne(type => Barrio)
    @JoinColumn({ name: "id_barrio" })
    barrio: Promise<Barrio>;
}
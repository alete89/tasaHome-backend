import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Localidad } from "./localidad";
import { Partido } from "./partido";
import { Provincia } from "./provincia";


@Entity()
export class Domicilio {

    constructor(init?: Partial<Domicilio>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: String

    @ManyToOne(type => Partido)
    @JoinColumn({ name: "id_partido" })
    partido: Partido

    @ManyToOne(type => Localidad)
    @JoinColumn({ name: "id_localidad" })
    localidad: Localidad

    @ManyToOne(type => Provincia)
    @JoinColumn({ name: "id_provincia" })
    provincia: Provincia
}
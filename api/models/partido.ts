import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Provincia } from "./provincia";

@Entity()
export class Partido {

    constructor(init?: Partial<Partido>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: String

    @ManyToOne(type => Provincia)
    @JoinColumn({ name: "id_provincia" })
    provincia: Promise<Provincia>;
}
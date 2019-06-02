import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"


@Entity()
export class Localidad {

    constructor(init?: Partial<Localidad>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: String
}
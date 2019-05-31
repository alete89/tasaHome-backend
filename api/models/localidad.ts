import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"


@Entity()
export class Localidad {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: String

    constructor(init?: Partial<Localidad>) {
        Object.assign(this, init)
    }
}
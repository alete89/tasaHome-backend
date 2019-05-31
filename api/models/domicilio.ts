import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"


@Entity()
export class Domicilio {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    descripcion: String
    // @Column()
    // partido: String
    // @Column()
    // localidad: String
    // @Column()
    // provincia: String


    constructor(init?: Partial<Domicilio>) {
        Object.assign(this, init)
    }
}
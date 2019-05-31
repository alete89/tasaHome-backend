import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Provincia {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: String

    constructor(init?: Partial<Provincia>) {
        Object.assign(this, init)
    }
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Partido {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: String

    constructor(init?: Partial<Partido>) {
        Object.assign(this, init)
    }
}
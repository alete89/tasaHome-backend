import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: String
    @Column()
    apellido: String
    @Column()
    email: String

    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init)
    }
}
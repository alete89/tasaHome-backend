import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Domicilio } from "./domicilio";


@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: String
    @Column()
    apellido: String
    @Column()
    edad: number
    @Column()
    email: String
    @Column()
    genero: String
    @Column()
    contraseña: String
    @ManyToOne(type => Domicilio)
    @JoinColumn({ name: "id_domicilio" })
    domicilio: Promise<Domicilio>;

    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init)
    }
}
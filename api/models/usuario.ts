import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Domicilio } from "./domicilio";

@Entity()
export class Usuario {

    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init)
    }

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
    fecha_nacimiento: Date

    @Column()
    contrasenia: String

    @ManyToOne(type => Domicilio)
    @JoinColumn({ name: "id_domicilio" })
    domicilio: Promise<Domicilio>;

    validar() {
        // if (!this.nombre || !this.apellido || !this.email || !this.contraseña) {
        //     throw "Usuario inválido"
        // }
    }

    static fromJson(usuarioJson: String) {
        return Object.assign(new Usuario(), usuarioJson)
    }
}
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    domicilio: String

    validar() {
        if (!this.nombre || !this.apellido || !this.email || !this.genero || !this.contrasenia) {
            throw "Usuario inválido"
        }
    }

    static fromJson(usuarioJson: String) {
        return Object.assign(new Usuario(), usuarioJson)
    }
}
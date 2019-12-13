import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuario {

    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    apellido: string

    @Column()
    edad: number

    @Column()
    email: string

    @Column()
    genero: string

    @Column()
    fecha_nacimiento: Date

    @Column()
    estado: string

    @Column()
    contrasenia: string

    @Column()
    domicilio: string

    @CreateDateColumn()
    fecha_alta: Date

    @UpdateDateColumn()
    fecha_modificacion: Date

    @Column({ nullable: true })
    token_recuperacion: string

    validar() {
        if (!this.nombre || !this.apellido || !this.email || !this.genero || !this.contrasenia) {
            throw "Usuario inválido"
        }
    }

    static fromJson(usuarioJson: string) {
        return Object.assign(new Usuario(), usuarioJson)
    }
}
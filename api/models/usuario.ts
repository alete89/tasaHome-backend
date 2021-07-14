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

    @Column({ default: 'Activo' })
    estado: string

    @Column({ default: false })
    esAdmin: boolean

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
        if (!this.nombre || !this.apellido || !this.email || !this.genero || !this.contrasenia || !this.edad) {
            throw "Faltan campos requeridos"
        }
        this.validarNombreYApellido()
        this.validarContrasenia()
        this.validarEdad()

    }

    validarNombreYApellido() {
        // this.validarSoloLetras(this.nombre)
        // this.validarSoloLetras(this.apellido)
    }

    validarSoloLetras(texto: String) {
        let letters = /^[A-Za-z]+$/
        if (!texto.match(letters)) {
            throw "Nombre y apellido deben contener solamente letras"
        }
    }

    validarContrasenia() {
        if (this.contrasenia.length < 8) {
            throw "La contraseña debe tener al menos 8 carácteres"
        }
        if (this.contrasenia.length > 72) {
            throw "La contraseña no puede tener más de 72 carácteres"
        }
    }

    validarEdad() {
        if (this.edad < 18) {
            throw "Debe ser tener más de 18 años"
        }
        if (this.edad > 100) {
            throw "La edad debe ser menor a 100"
        }
    }

    static fromJson(usuarioJson: string) {
        return Object.assign(new Usuario(), usuarioJson)
    }
}
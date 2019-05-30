
export class Usuario {
    nombre: String = ""
    apellido: String = ""
    email: String = ""

    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init)
    }
}
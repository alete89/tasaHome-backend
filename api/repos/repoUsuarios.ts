import { EntityRepository, Repository } from "typeorm";
import { Usuario } from "../models/usuario";

@EntityRepository(Usuario)
export class RepoUsuarios extends Repository<Usuario> {

    async todosLosUsuarios() {
        try {
            return await this.find()
        } catch (e) {
            console.log(e)
        }
    }

    async login(posible_email: String, posible_password: String) {
        try {
            let usuario: any = await this.findOneOrFail({ email: posible_email })
            if (usuario.contraseña != posible_password) {
                throw "Credenciales incorrectas"
            }
            return usuario
        } catch (error) {
            return "Credenciales incorrectas"
        }
    }

    async searchById(id: number) {
        return await this.findOne(id)
    }

    async noHayUsuarios() {
        try {
            return await this.count() == 0
        } catch (e) {
            console.log(e)
        }
    }

    async guardarUsuarios(usuarios: Usuario[]) {
        try {
            await this.save(usuarios)
        } catch (e) {
            console.log(e)
        }
    }

}
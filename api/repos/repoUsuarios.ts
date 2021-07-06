import { EntityRepository, Repository } from "typeorm";
import { Usuario } from "../models/usuario";

@EntityRepository(Usuario)
export class RepoUsuarios extends Repository<Usuario> {

    async todosLosUsuarios() {
        return await this.find()
    }

    async login(posible_email: string, posible_password: string) {
        try {
            let usuario: any = await this.findOneOrFail({ email: posible_email })
            if (usuario.contrasenia != posible_password) {
                throw "Credenciales incorrectas"
            }
            return usuario
        } catch (error) {
            throw "Credenciales incorrectas"
        }
    }

    async recuperarContraseña(email: string) {
        //TODO
    }

    async searchById(id: string) {
        return await this.findOneOrFail(id)
    }

    async searchByEmail(posible_email: string) {
        let usuario: Usuario = await this.findOneOrFail({ email: posible_email })
        return usuario
    }

    async searchByToken(token: string) {
        let usuario: Usuario = await this.findOneOrFail({ token_recuperacion: token })
        return usuario
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

    async contactar_usuario(email: string, mensaje: string) {
        //TODO
    }

}
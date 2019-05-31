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
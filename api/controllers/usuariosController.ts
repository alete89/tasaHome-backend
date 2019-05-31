import { Usuario } from "../models/usuario";
import { createConnection } from "typeorm";

export class UsuariosController {

    static instance: UsuariosController

    // static getInstance() {
    //     if (this.instance === undefined) {
    //         this.instance = new UsuariosController()
    //     }
    //     return this.instance
    // }

    async  crearConexion() {
        // createConnection method will automatically read connection options
        // from your ormconfig file or environment variables
        const connection = await createConnection();
        return connection
    }

    async todosLosUsuarios() {
        try {
            let conexion = await this.crearConexion()
            let usuarios = await conexion.manager.find(Usuario)
            conexion.close()
            return usuarios
        }
        catch (e) {
            console.log(e)
        }
    }

}
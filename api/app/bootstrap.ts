import { Usuario } from "../models/usuario";
import { Domicilio } from "../models/domicilio";
import { createConnection, Connection } from "typeorm";

export class Bootstrap {

    usuarios: Usuario[] = []
    domicilios: Domicilio[]
    domicilioJuan: Domicilio
    domicilioPedro: Domicilio
    conexion: Connection

    async run() {
        await this.crearConexion()
        await this.crearDomicilios()
        await this.crearUsuarios()
        await this.conexion.close()
    }

    async crearDomicilios() {
        this.domicilioJuan = new Domicilio({ descripcion: "Posadas 1515" })
        this.domicilioPedro = new Domicilio({ descripcion: "Ayacucho 3520" })
        this.domicilios = [this.domicilioJuan, this.domicilioPedro]
        await this.guardarDomiclios()

    }

    async guardarDomiclios() {
        try {
            // let conexion = await this.crearConexion()
            await this.conexion.manager.save(this.domicilios)
            // conexion.close()
        } catch (e) {
            console.log(e)
        }
    }

    async crearUsuarios() {
        this.usuarios = [new Usuario({
            nombre: "Juan", apellido: "Perez", edad: 20, email: "juanp@mail.com", genero: "Hombre", contraseña: "123",
            domicilio: this.domicilioJuan
        }),
            // new Usuario({ nombre: "Pedro", apellido: "Gutierrez", email: "pedrog@mail.com" })
        ]
        await this.guardarUsuarios()
    }

    async guardarUsuarios() {
        try {
            // let conexion = await this.crearConexion()
            await this.conexion.manager.save(this.usuarios)
            // this.conexion.close()
        } catch (e) {
            console.log(e)
        }

    }

    async  crearConexion() {
        // createConnection method will automatically read connection options
        // from your ormconfig file or environment variables
        this.conexion = await createConnection();
    }

}

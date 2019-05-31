import { createConnection, getCustomRepository, getRepository, Repository } from "typeorm";
import { Domicilio } from "../models/domicilio";
import { Usuario } from "../models/usuario";
import { RepoUsuarios } from "../repos/repoUsuarios";

export class Bootstrap {

    usuarios: Usuario[] = []
    domicilios: Domicilio[]
    domicilioJuan: Domicilio
    domicilioCeleste: Domicilio
    repoUsuarios: RepoUsuarios
    repoDomicilio: Repository<Domicilio>

    async run() {
        try {
            let conexion = await createConnection()
            this.repoUsuarios = await getCustomRepository(RepoUsuarios);
            let noHayUsuarios = await this.repoUsuarios.noHayUsuarios()
            if (noHayUsuarios) {
                this.repoDomicilio = await getRepository(Domicilio)
                await this.crearDomicilios()
                await this.crearUsuarios()
            }
            conexion.close()
        }
        catch (e) {
            console.log(e)
        }
    }

    async crearDomicilios() {
        this.domicilioJuan = new Domicilio({ descripcion: "Posadas 1515" })
        this.domicilioCeleste = new Domicilio({ descripcion: "Ayacucho 3520" })
        this.domicilios = [this.domicilioJuan, this.domicilioCeleste]
        await this.repoDomicilio.save(this.domicilios)
    }

    async crearUsuarios() {
        this.usuarios = [new Usuario({
            nombre: "Juan", apellido: "Perez", edad: 20, email: "juanp@mail.com", genero: "Hombre", contraseña: "123",
            domicilio: this.domicilioJuan
        }),
        new Usuario({
            nombre: "Celeste", apellido: "Cid", edad: 45, email: "celes@mail.com", genero: "Mujer", contraseña: "cel",
            domicilio: this.domicilioCeleste
        })
        ]
        await this.repoUsuarios.guardarUsuarios(this.usuarios)
    }

}



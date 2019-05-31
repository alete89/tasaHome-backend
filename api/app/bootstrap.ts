import { createConnection, getCustomRepository, getRepository, Repository } from "typeorm";
import { Domicilio } from "../models/domicilio";
import { Usuario } from "../models/usuario";
import { RepoUsuarios } from "../repos/repoUsuarios";
import { Partido } from "../models/partido";
import { Localidad } from "../models/localidad";
import { Provincia } from "../models/provincia";

export class Bootstrap {

    usuarios: Usuario[] = []
    domicilios: Domicilio[]
    domicilioJuan: Domicilio
    domicilioCeleste: Domicilio
    repoUsuarios: RepoUsuarios
    repoDomicilio: Repository<Domicilio>
    sanMartin: Partido
    ballester: Localidad
    buenosAires: Provincia

    async run() {
        try {
            let conexion = await createConnection()
            this.repoUsuarios = getCustomRepository(RepoUsuarios);
            let noHayUsuarios = await this.repoUsuarios.noHayUsuarios()
            if (noHayUsuarios) {
                this.repoDomicilio = getRepository(Domicilio)
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
        this.buenosAires = new Provincia({ nombre: "Buenos Aires" })
        this.sanMartin = new Partido({ nombre: "San Martín" })
        this.ballester = new Localidad({ nombre: "Villa Ballester" })
        await getRepository(Provincia).save(this.buenosAires)
        await getRepository(Partido).save(this.sanMartin)
        await getRepository(Localidad).save(this.ballester)
        this.domicilioJuan = new Domicilio({ descripcion: "Posadas 1515", provincia: Promise.resolve(this.buenosAires), partido: Promise.resolve(this.sanMartin), localidad: Promise.resolve(this.ballester) })
        this.domicilioCeleste = new Domicilio({ descripcion: "Ayacucho 3520", provincia: Promise.resolve(this.buenosAires), partido: Promise.resolve(this.sanMartin), localidad: Promise.resolve(this.ballester) })
        this.domicilios = [this.domicilioJuan, this.domicilioCeleste]
        await this.repoDomicilio.save(this.domicilios)
    }

    async crearUsuarios() {
        this.usuarios = [new Usuario({
            nombre: "Juan", apellido: "Perez", edad: 20, email: "juanp@mail.com", genero: "Hombre", contraseña: "123",
            domicilio: Promise.resolve(this.domicilioJuan)
        }),
        new Usuario({
            nombre: "Celeste", apellido: "Cid", edad: 45, email: "celes@mail.com", genero: "Mujer", contraseña: "cel",
            domicilio: Promise.resolve(this.domicilioCeleste)
        })
        ]
        await this.repoUsuarios.guardarUsuarios(this.usuarios)
    }

}



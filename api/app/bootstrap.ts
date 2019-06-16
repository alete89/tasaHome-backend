import { createConnection, getCustomRepository, getRepository, Repository } from "typeorm";
import { Barrio } from "../models/barrio";
import { Domicilio } from "../models/domicilio";
import { Escuela } from "../models/escuela";
import { Localidad } from "../models/localidad";
import { Partido } from "../models/partido";
import { Provincia } from "../models/provincia";
import { Tasacion } from "../models/tasacion";
import { Usuario } from "../models/usuario";
import { RepoUsuarios } from "../repos/repoUsuarios";
import { Comisaria } from "../models/comisaria";
import { EspacioVerde } from "../models/espacio_verde";
import { Hospital } from "../models/hospital";
import { TipoPropiedad } from "../models/tipo_propiedad";
import { TipoOperacion } from "../models/tipo_operacion";
import { Estado } from "../models/estado";
import { Servicio } from "../models/servicio";
import { Comuna } from "../models/comuna";

export class Bootstrap {

    usuarios: Usuario[] = []
    juan: Usuario
    celeste: Usuario
    domicilios: Domicilio[]
    domicilioJuan: Domicilio
    domicilioCeleste: Domicilio
    repoUsuarios: RepoUsuarios
    repoDomicilio: Repository<Domicilio>
    sanMartin: Partido
    ballester: Localidad
    buenosAires: Provincia
    villaUrquiza: Barrio
    recoleta: Barrio
    tasacion: Tasacion
    casa: TipoPropiedad
    venta: TipoOperacion
    electricidad: Servicio
    comuna12: Comuna

    async run() {
        try {
            let conexion = await createConnection()
            this.repoUsuarios = getCustomRepository(RepoUsuarios);
            let noHayUsuarios = await this.repoUsuarios.noHayUsuarios()
            if (noHayUsuarios) {
                this.repoDomicilio = getRepository(Domicilio)
                await this.crearComunas()
                await this.crearBarrios()
                await this.crearEscuelas()
                await this.crearComisarias()
                await this.crearEspacios()
                await this.crearHospitales()
                await this.crearDomicilios()
                await this.crearUsuarios()
                await this.crearTiposDePropiedad()
                await this.crearTiposDeOperacion()
                await this.crearServicios()
                await this.crearTasaciones()
            }
            conexion.close()
        }
        catch (e) {
            console.log(e)
        }
    }

    async crearBarrios() {
        this.villaUrquiza = new Barrio({ descripcion: "Villa Urquiza", comuna: Promise.resolve(this.comuna12) })
        this.recoleta = new Barrio({ descripcion: "Recoleta", comuna: Promise.resolve(this.comuna12) })
        await getRepository(Barrio).save(this.villaUrquiza)
        await getRepository(Barrio).save(this.recoleta)

    }

    async crearComunas() {
        this.comuna12 = new Comuna({ descripcion: "Comuna 12" })
        await getRepository(Comuna).save(this.comuna12)
    }

    async crearEscuelas() {
        let escuela: Escuela = new Escuela()
        let escuela2: Escuela = new Escuela()
        escuela.barrio = Promise.resolve(this.villaUrquiza)
        escuela2.barrio = Promise.resolve(this.recoleta)
        await getRepository(Escuela).save(escuela).catch(function (error) {
            console.log(error)
        })
        await getRepository(Escuela).save(escuela2).catch(function (error) {
            console.log(error)
        })
    }

    async crearComisarias() {
        let comisaria: Comisaria = new Comisaria()
        comisaria.barrio = Promise.resolve(this.villaUrquiza)
        await getRepository(Comisaria).save(comisaria).catch(function (error) {
            console.log(error)
        })
    }

    async crearEspacios() {
        let espacio_verde: EspacioVerde = new EspacioVerde()
        espacio_verde.barrio = Promise.resolve(this.villaUrquiza)
        await getRepository(EspacioVerde).save(espacio_verde).catch(function (error) {
            console.log(error)
        })
    }

    async crearHospitales() {
        let hospital: Hospital = new Hospital()
        hospital.barrio = Promise.resolve(this.villaUrquiza)
        await getRepository(Hospital).save(hospital).catch(function (error) {
            console.log(error)
        })
    }

    async crearDomicilios() {
        this.buenosAires = new Provincia({ descripcion: "Buenos Aires" })
        this.sanMartin = new Partido({ descripcion: "San Martín", provincia: Promise.resolve(this.buenosAires) })
        this.ballester = new Localidad({ descripcion: "Villa Ballester", partido: Promise.resolve(this.sanMartin) })
        await getRepository(Provincia).save(this.buenosAires)
        await getRepository(Partido).save(this.sanMartin)
        await getRepository(Localidad).save(this.ballester)
        this.domicilioJuan = new Domicilio({
            descripcion: "Posadas 1515",
            provincia: Promise.resolve(this.buenosAires), partido: Promise.resolve(this.sanMartin),
            localidad: Promise.resolve(this.ballester)
        })
        this.domicilioCeleste = new Domicilio({
            descripcion: "Ayacucho 3520",
            provincia: Promise.resolve(this.buenosAires),
            partido: Promise.resolve(this.sanMartin),
            localidad: Promise.resolve(this.ballester)
        })
        this.domicilios = [this.domicilioJuan, this.domicilioCeleste]
        await this.repoDomicilio.save(this.domicilios)
    }

    async crearTiposDePropiedad() {
        this.casa = new TipoPropiedad({ descripcion: "Casa" })
        await getRepository(TipoPropiedad).save(this.casa)
    }

    async crearTiposDeOperacion() {
        this.venta = new TipoOperacion({ descripcion: "Venta" })
        await getRepository(TipoOperacion).save(this.venta)
    }

    async crearServicios() {
        this.electricidad = new Servicio({ descripcion: "Electricidad" })
        await getRepository(Servicio).save(this.electricidad)
    }

    async crearTasaciones() {

        let estado_propiedad = new Estado({ descripcion: "Bueno" })
        await getRepository(Estado).save(estado_propiedad)

        this.tasacion = new Tasacion({
            descripcion: "Tasación prueba",
            ambientes: 5,
            superficie: 300,
            fecha: new Date,
            barrio: Promise.resolve(this.villaUrquiza),
            usuario: Promise.resolve(this.celeste),
            tipoDePropiedad: Promise.resolve(this.casa),
            tipoDeOperacion: Promise.resolve(this.venta),
            estado: Promise.resolve(estado_propiedad),
            servicios: Promise.resolve([this.electricidad])
        })
        this.tasacion.calcularValor()
        await getRepository(Tasacion).save(this.tasacion)
    }

    async crearUsuarios() {
        this.juan = new Usuario({
            nombre: "Juan", apellido: "Perez", edad: 20, email: "juanp@mail.com", genero: "Hombre", contraseña: "123",
            domicilio: Promise.resolve(this.domicilioJuan), fecha_nacimiento: new Date()
        })
        this.celeste = new Usuario({
            nombre: "Celeste", apellido: "Cid", edad: 45, email: "celes@mail.com", genero: "Mujer", contraseña: "cel",
            domicilio: Promise.resolve(this.domicilioCeleste), fecha_nacimiento: new Date()
        })
        this.usuarios = [this.juan, this.celeste]
        await this.repoUsuarios.guardarUsuarios(this.usuarios)
    }
}



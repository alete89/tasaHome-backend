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
import { SitioPublicacion } from "../models/sitio_publicacion";

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
    departamento: TipoPropiedad
    ph: TipoPropiedad
    venta: TipoOperacion
    alquiler: TipoOperacion
    electricidad: Servicio
    gas_natural: Servicio
    telefono: Servicio
    agua_corriente: Servicio
    desague_cloacal: Servicio
    comuna12: Comuna
    zonaProp: SitioPublicacion
    argenProp: SitioPublicacion
    icasas: SitioPublicacion
    olx: SitioPublicacion

    async run() {
        try {
            let conexion = await createConnection({
                "type": "mysql",
                "host": "localhost",
                "port": 3306,
                "username": "tasaHome",
                "password": "tasaHome",
                "database": "tasaHome",
                "synchronize": true,
                "logging": ["query", "error"],
                "entities": [
                    "api/models/*.ts"
                ],
                "migrations": [],
                "subscribers": []
            })
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
                await this.crearSitiosPublicacion()
                await this.crearTasaciones()
            }
            conexion.close()
        }
        catch (e) {
            console.log(e)
        }
    }

    async crearBarrios() {
        this.villaUrquiza = new Barrio({ descripcion: "Villa Urquiza", comuna: this.comuna12 })
        this.recoleta = new Barrio({ descripcion: "Recoleta", comuna: this.comuna12 })
        await getRepository(Barrio).save([this.villaUrquiza, this.recoleta])
    }

    async crearComunas() {
        this.comuna12 = new Comuna({ descripcion: "Comuna 12" })
        await getRepository(Comuna).save(this.comuna12)
    }

    async crearEscuelas() {
        let escuela: Escuela = new Escuela()
        let escuela2: Escuela = new Escuela()
        escuela.barrio = this.villaUrquiza
        escuela2.barrio = this.recoleta
        await getRepository(Escuela).save(escuela).catch(function (error) {
            console.log(error)
        })
        await getRepository(Escuela).save(escuela2).catch(function (error) {
            console.log(error)
        })
    }

    async crearComisarias() {
        let comisaria: Comisaria = new Comisaria()
        comisaria.barrio = this.villaUrquiza
        await getRepository(Comisaria).save(comisaria).catch(function (error) {
            console.log(error)
        })
    }

    async crearEspacios() {
        let espacio_verde: EspacioVerde = new EspacioVerde()
        espacio_verde.barrio = this.villaUrquiza
        await getRepository(EspacioVerde).save(espacio_verde).catch(function (error) {
            console.log(error)
        })
    }

    async crearHospitales() {
        let hospital: Hospital = new Hospital()
        hospital.barrio = this.villaUrquiza
        await getRepository(Hospital).save(hospital).catch(function (error) {
            console.log(error)
        })
    }

    async crearDomicilios() {
        this.buenosAires = new Provincia({ descripcion: "Buenos Aires" })
        this.sanMartin = new Partido({ descripcion: "San Martín", provincia: this.buenosAires })
        this.ballester = new Localidad({ descripcion: "Villa Ballester", partido: this.sanMartin })
        await getRepository(Provincia).save(this.buenosAires)
        await getRepository(Partido).save(this.sanMartin)
        await getRepository(Localidad).save(this.ballester)
        this.domicilioJuan = new Domicilio({
            descripcion: "Posadas 1515",
            provincia: this.buenosAires, partido: this.sanMartin,
            localidad: this.ballester
        })
        this.domicilioCeleste = new Domicilio({
            descripcion: "Ayacucho 3520",
            provincia: this.buenosAires,
            partido: this.sanMartin,
            localidad: this.ballester
        })
        this.domicilios = [this.domicilioJuan, this.domicilioCeleste]
        await this.repoDomicilio.save(this.domicilios)
    }

    async crearTiposDePropiedad() {
        this.casa = new TipoPropiedad({ descripcion: "Casa" })
        this.departamento = new TipoPropiedad({ descripcion: "Departamento" })
        this.ph = new TipoPropiedad({ descripcion: "PH" })
        await getRepository(TipoPropiedad).save([this.casa, this.departamento, this.ph])
    }

    async crearTiposDeOperacion() {
        this.venta = new TipoOperacion({ descripcion: "Venta" })
        this.alquiler = new TipoOperacion({ descripcion: "Alquiler" })
        await getRepository(TipoOperacion).save([this.venta, this.alquiler])
    }

    async crearServicios() {
        this.gas_natural = new Servicio({ descripcion: "Gas natural" })
        this.electricidad = new Servicio({ descripcion: "Electricidad" })
        this.telefono = new Servicio({ descripcion: "Teléfono" })
        this.agua_corriente = new Servicio({ descripcion: "Agua corriente" })
        this.desague_cloacal = new Servicio({ descripcion: "Desagüe cloacal" })

        await getRepository(Servicio).save([this.gas_natural, this.electricidad, this.telefono, this.agua_corriente, this.desague_cloacal])
    }

    async crearSitiosPublicacion() {
        this.zonaProp = new SitioPublicacion({
            descripcion: "ZonaProp",
            logo_url: "http://www.mapaprop.com/blog/wp-content/uploads/2017/05/partners-zonaprop-512.png",
            url_publicar: "https://www.zonaprop.com.ar/landingFreemium.bum"
        })
        this.argenProp = new SitioPublicacion({
            descripcion: "ArgenProp",
            logo_url: "https://pbs.twimg.com/media/DBbh5CwUIAAXRjT.jpg",
            url_publicar: "https://www.argenprop.com/Publicar"
        })
        this.olx = new SitioPublicacion({
            descripcion: "OLX",
            logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/OLX_Logo.jpg/245px-OLX_Logo.jpg",
            url_publicar: "https://www.olx.com.ar/posting#"
        }),
            this.icasas = new SitioPublicacion({
                descripcion: "Icasas",
                logo_url: "http://www.mapaprop.com/blog/wp-content/uploads/2015/07/logo-icasas.png",
                url_publicar: "https://www.icasas.com.ar/publicar/particular"
            })
        await getRepository(SitioPublicacion).save([this.zonaProp, this.argenProp, this.olx, this.icasas])
    }

    async crearTasaciones() {

        let muy_malo = new Estado({ descripcion: "Muy malo" })
        let malo = new Estado({ descripcion: "Malo" })
        let regular = new Estado({ descripcion: "Regular" })
        let bueno = new Estado({ descripcion: "Bueno" })
        let muy_bueno = new Estado({ descripcion: "Muy bueno" })
        await getRepository(Estado).save([muy_malo, malo, regular, bueno, muy_bueno])

        this.tasacion = new Tasacion({
            descripcion: "Tasación prueba",
            direccion: "Corrientes 3000",
            ambientes: 5,
            superficie: 300,
            fecha: new Date,
            privada: false,
            barrio: this.villaUrquiza,
            usuario: this.celeste,
            tipoDePropiedad: this.casa,
            tipoDeOperacion: this.venta,
            estado: bueno,
            servicios: [this.electricidad],
            sitios_publicados: [this.zonaProp],
        })
        this.tasacion.calcularValor()
        await getRepository(Tasacion).save(this.tasacion)
    }

    async crearUsuarios() {
        this.juan = new Usuario({
            nombre: "Juan", apellido: "Perez", edad: 20, email: "juanp@mail.com", genero: "Hombre", contrasenia: "123",
            domicilio: this.domicilioJuan, fecha_nacimiento: new Date()
        })
        this.celeste = new Usuario({
            nombre: "Celeste", apellido: "Cid", edad: 45, email: "celes@mail.com", genero: "Mujer", contrasenia: "cel",
            domicilio: this.domicilioCeleste, fecha_nacimiento: new Date()
        })
        this.usuarios = [this.juan, this.celeste]
        await this.repoUsuarios.guardarUsuarios(this.usuarios)
    }
}



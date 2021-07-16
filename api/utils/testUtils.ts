import { createConnection, getConnectionOptions, getCustomRepository, getRepository } from "typeorm";
import { bootstrap } from "../app/bootstrap";
import { almagro, barracas, barrios, belgrano, boedo, caballito, comuna02, comuna12, comunas, constitucion, parquePatricios, recoleta, sanCristobal, sanNicolas, usuarios, villaDevoto, villaUrquiza } from "../app/constantes";
import { Barrio } from "../models/barrio";
import { Comisaria } from "../models/comisaria";
import { Comuna } from "../models/comuna";
import { Escuela } from "../models/escuela";
import { EspacioVerde } from "../models/espacio_verde";
import { Hospital } from "../models/hospital";
import { RepoUsuarios } from "../repos/repoUsuarios";

export async function createTypeormConn(sync: boolean = false) {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
    // return createConnection({ ...connectionOptions })
    const connection = await createConnection({ ...connectionOptions, name: "default" })
    await connection.synchronize(sync)
    return connection
}

export async function runTestBootstrap() {
    const repoUsuarios = await getCustomRepository(RepoUsuarios)
    await repoUsuarios.guardarUsuarios(usuarios)
}

export async function setup() {
    // await clear()
    await bootstrap.crearUsuarios()
    await bootstrap.crearTiposDePropiedad()
    await bootstrap.crearTiposDeOperacion()
    await bootstrap.crearServicios()
    await bootstrap.crearConfiguraciones()
    await bootstrap.crearComunas()
    await bootstrap.crearBarrios()
    await bootstrap.crearTasaciones()
    await bootstrap.crearSitiosPublicacion()
    await bootstrap.crearValuaciones()
    await crearEscuelas()
    await crearComisarias()
    await crearEspacios()
    await crearHospitales()
}

async function crearEscuelas() {
    const escuela_0001: Escuela = new Escuela({ latitud: -34.600585579493, longitud: -58.5127015868307, descripcion: "Centro Educativo de Nivel Secundario N° 65", barrio: villaDevoto })
    const escuela_0002: Escuela = new Escuela({ latitud: -34.6275450762093, longitud: -58.4095720793038, descripcion: "Inst. 9 de Julio", barrio: sanCristobal })
    const escuela_0003: Escuela = new Escuela({ latitud: -34.5656755865268, longitud: -58.4701920657306, descripcion: "Escuela Infantil N° 06/10° Madre Eufrasia Iaconis", barrio: belgrano })
    const escuela_0004: Escuela = new Escuela({ latitud: -34.5848468758467, longitud: -58.4003567653869, descripcion: "Escuela Infantil N° 08/01°", barrio: recoleta })
    const escuela_0005: Escuela = new Escuela({ latitud: -34.6033788550838, longitud: -58.42654700069, descripcion: "Jardín de Infantes Nucleado C (EPCjc 11/02°)", barrio: almagro })
    await getRepository(Escuela).save([escuela_0001, escuela_0002, escuela_0003, escuela_0004, escuela_0005])

}

async function crearComisarias() {
    let comisaria_0001: Comisaria = new Comisaria({ latitud: -34.6019061749623, longitud: -58.3732447121941, descripcion: "Comisaria Vecinal 1-D", barrio: sanNicolas })
    let comisaria_0002: Comisaria = new Comisaria({ latitud: -34.6286410416508, longitud: -58.4249262384203, descripcion: "Comisaria Vecinal 5-B", barrio: boedo })
    let comisaria_0003: Comisaria = new Comisaria({ latitud: -34.608978570123, longitud: -58.4395014329687, descripcion: "Comisaria Vecinal 6-A", barrio: caballito })
    let comisaria_0004: Comisaria = new Comisaria({ latitud: -34.6267799123199, longitud: -58.4480872125898, descripcion: "Comisaria Vecinal 7-B", barrio: caballito })
    let comisaria_0005: Comisaria = new Comisaria({ latitud: -34.6203822656691, longitud: -58.4532210423583, descripcion: "Comisaria Comunal 6", barrio: caballito })
    await getRepository(Comisaria).save([comisaria_0001, comisaria_0002, comisaria_0003, comisaria_0004, comisaria_0005])

}

async function crearEspacios() {
    let espacio_verde_0001: EspacioVerde = new EspacioVerde({ latitud: -34.600635582008, longitud: -58.3693622231404, descripcion: "ROMA", barrio: sanNicolas })
    let espacio_verde_0002: EspacioVerde = new EspacioVerde({ latitud: -34.604170538560, longitud: -58.3681276958422, descripcion: "HIPÓLITO BOUCHARD", barrio: sanNicolas })
    let espacio_verde_0003: EspacioVerde = new EspacioVerde({ latitud: -34.604012114971, longitud: -58.3681702912675, descripcion: "DOCTOR CARLOS ALBERTO ERRO", barrio: sanNicolas })
    let espacio_verde_0004: EspacioVerde = new EspacioVerde({ latitud: -34.603010527001, longitud: -58.3684416747858, descripcion: "DEL TANGO", barrio: sanNicolas })
    let espacio_verde_0005: EspacioVerde = new EspacioVerde({ latitud: -34.607347763847, longitud: -58.3778933258764, descripcion: "ROBERTO ARLT", barrio: sanNicolas })
        await getRepository(EspacioVerde).save([espacio_verde_0001, espacio_verde_0002, espacio_verde_0003, espacio_verde_0004, espacio_verde_0005])
}

async function crearHospitales() {
    let hospital_0001: Hospital = new Hospital({ latitud: -34.6288473603882, longitud: -58.3775508488443, descripcion: "HOSPITAL GENERAL DE NIÑOS PEDRO DE ELIZALDE", barrio: barracas })
    let hospital_0002: Hospital = new Hospital({ latitud: -34.5941919726393, longitud: -58.4120700769456, descripcion: "HOSPITAL GENERAL DE NIÑOS RICARDO GUTIERREZ", barrio: recoleta })
    let hospital_0003: Hospital = new Hospital({ latitud: -34.5847671286454, longitud: -58.4005143372538, descripcion: "HOSPITAL DE ODONTOLOGIA DR. RAMON CARRILLO (EX NACIONAL)", barrio: recoleta })
    let hospital_0004: Hospital = new Hospital({ latitud: -34.6394041316484, longitud: -58.3851559118889, descripcion: "HOSPITAL DE SALUD MENTAL BRAULIO MOYANO", barrio: barracas })
    let hospital_0005: Hospital = new Hospital({ latitud: -34.6341535760002, longitud: -58.3913114406535, descripcion: "HOSPITAL DE GASTROENTEROLOGIA B. UDAONDO", barrio: parquePatricios })
    await getRepository(Hospital).save([hospital_0001, hospital_0002, hospital_0003, hospital_0004, hospital_0005])
}
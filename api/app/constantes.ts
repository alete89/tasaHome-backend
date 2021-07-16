import { Barrio } from "../models/barrio"
import { Comuna } from "../models/comuna"
import { Estado } from "../models/estado"
import { Servicio } from "../models/servicio"
import { Tasacion } from "../models/tasacion"
import { TipoOperacion } from "../models/tipo_operacion"
import { TipoPropiedad } from "../models/tipo_propiedad"
import { Usuario } from "../models/usuario"

export const comuna01 = new Comuna({ descripcion: "Comuna 1" })
export const comuna02 = new Comuna({ descripcion: "Comuna 2" })
export const comuna03 = new Comuna({ descripcion: "Comuna 3" })
export const comuna04 = new Comuna({ descripcion: "Comuna 4" })
export const comuna05 = new Comuna({ descripcion: "Comuna 5" })
export const comuna06 = new Comuna({ descripcion: "Comuna 6" })
export const comuna07 = new Comuna({ descripcion: "Comuna 7" })
export const comuna08 = new Comuna({ descripcion: "Comuna 8" })
export const comuna09 = new Comuna({ descripcion: "Comuna 9" })
export const comuna10 = new Comuna({ descripcion: "Comuna 10" })
export const comuna11 = new Comuna({ descripcion: "Comuna 11" })
export const comuna12 = new Comuna({ descripcion: "Comuna 12" })
export const comuna13 = new Comuna({ descripcion: "Comuna 13" })
export const comuna14 = new Comuna({ descripcion: "Comuna 14" })
export const comuna15 = new Comuna({ descripcion: "Comuna 15" })

export const constitucion = new Barrio({ descripcion: "Constitución", comuna: comuna01 })
export const monserrat = new Barrio({ descripcion: "Monserrat", comuna: comuna01 })
export const puertoMadero = new Barrio({ descripcion: "Puerto Madero", comuna: comuna01 })
export const retiro = new Barrio({ descripcion: "Retiro", comuna: comuna01 })
export const sanNicolas = new Barrio({ descripcion: "San Nicolás", comuna: comuna01 })
export const sanTelmo = new Barrio({ descripcion: "San Telmo", comuna: comuna01 })
export const recoleta = new Barrio({ descripcion: "Recoleta", comuna: comuna02 })
export const balvanera = new Barrio({ descripcion: "Balvanera", comuna: comuna03 })
export const sanCristobal = new Barrio({ descripcion: "San Cristóbal", comuna: comuna03 })
export const barracas = new Barrio({ descripcion: "Barracas", comuna: comuna04 })
export const boca = new Barrio({ descripcion: "Boca", comuna: comuna04 })
export const nuevaPompeya = new Barrio({ descripcion: "Nueva Pompeya", comuna: comuna04 })
export const parquePatricios = new Barrio({ descripcion: "Parque Patricios", comuna: comuna04 })
export const almagro = new Barrio({ descripcion: "Almagro", comuna: comuna05 })
export const boedo = new Barrio({ descripcion: "Boedo", comuna: comuna05 })
export const caballito = new Barrio({ descripcion: "Caballito", comuna: comuna06 })
export const flores = new Barrio({ descripcion: "Flores", comuna: comuna07 })
export const parqueChacabuco = new Barrio({ descripcion: "Parque Chacabuco", comuna: comuna07 })
export const villaLugano = new Barrio({ descripcion: "Villa Lugano", comuna: comuna08 })
export const villaRiachuelo = new Barrio({ descripcion: "Villa Riachuelo", comuna: comuna08 })
export const villaSoldati = new Barrio({ descripcion: "Villa Soldati", comuna: comuna08 })
export const liniers = new Barrio({ descripcion: "Liniers", comuna: comuna09 })
export const mataderos = new Barrio({ descripcion: "Mataderos", comuna: comuna09 })
export const parqueAvellaneda = new Barrio({ descripcion: "Parque Avellaneda", comuna: comuna09 })
export const floresta = new Barrio({ descripcion: "Floresta", comuna: comuna10 })
export const monteCastro = new Barrio({ descripcion: "Monte Castro", comuna: comuna10 })
export const velezSarsfield = new Barrio({ descripcion: "Vélez Sarsfield", comuna: comuna10 })
export const versalles = new Barrio({ descripcion: "Versalles", comuna: comuna10 })
export const villaLuro = new Barrio({ descripcion: "Villa Luro", comuna: comuna10 })
export const villaReal = new Barrio({ descripcion: "Villa Real", comuna: comuna10 })
export const villaDelParque = new Barrio({ descripcion: "Villa del Parque", comuna: comuna11 })
export const villaDevoto = new Barrio({ descripcion: "Villa Devoto", comuna: comuna11 })
export const villaGralMitre = new Barrio({ descripcion: "Villa Gral. Mitre", comuna: comuna11 })
export const villaSantaRita = new Barrio({ descripcion: "Villa Santa Rita", comuna: comuna11 })
export const coghlan = new Barrio({ descripcion: "Coghlan", comuna: comuna12 })
export const saavedra = new Barrio({ descripcion: "Saavedra", comuna: comuna12 })
export const villaPueyrredon = new Barrio({ descripcion: "Villa Pueyrredón", comuna: comuna12 })
export const villaUrquiza = new Barrio({ descripcion: "Villa Urquiza", comuna: comuna12 })
export const belgrano = new Barrio({ descripcion: "Belgrano", comuna: comuna13 })
export const colegiales = new Barrio({ descripcion: "Colegiales", comuna: comuna13 })
export const nuniez = new Barrio({ descripcion: "Nuñez", comuna: comuna13 })
export const palermo = new Barrio({ descripcion: "Palermo", comuna: comuna14 })
export const agronomia = new Barrio({ descripcion: "Agronomía", comuna: comuna15 })
export const chacarita = new Barrio({ descripcion: "Chacarita", comuna: comuna15 })
export const parqueChas = new Barrio({ descripcion: "Parque Chas", comuna: comuna15 })
export const paternal = new Barrio({ descripcion: "Paternal", comuna: comuna15 })
export const villaCrespo = new Barrio({ descripcion: "Villa Crespo", comuna: comuna15 })
export const villaOrtuzar = new Barrio({ descripcion: "Villa Ortúzar", comuna: comuna15 })

export const muy_malo = new Estado({ descripcion: "Muy malo", coeficiente: 0.8 })
export const malo = new Estado({ descripcion: "Malo", coeficiente: 0.86 })
export const regular = new Estado({ descripcion: "Regular", coeficiente: 0.92 })
export const bueno = new Estado({ descripcion: "Bueno", coeficiente: 1 })
export const muy_bueno = new Estado({ descripcion: "Muy bueno", coeficiente: 1.15 })

export const gas_natural = new Servicio({ descripcion: "Gas natural", coeficiente: 1.04 })
export const electricidad = new Servicio({ descripcion: "Electricidad", coeficiente: 1.15 })
export const telefono = new Servicio({ descripcion: "Teléfono", coeficiente: 1.01 })
export const agua_corriente = new Servicio({ descripcion: "Agua corriente", coeficiente: 1.15 })
export const desague_cloacal = new Servicio({ descripcion: "Desagüe cloacal", coeficiente: 1.06 })

export const casa = new TipoPropiedad({ descripcion: "Casa", coeficiente: 1.15 })
export const departamento = new TipoPropiedad({ descripcion: "Departamento", coeficiente: 1 })
export const ph = new TipoPropiedad({ descripcion: "PH", coeficiente: 1.07 })

export const venta = new TipoOperacion({ descripcion: "Venta", coeficiente: 1 })
export const alquiler = new TipoOperacion({ descripcion: "Alquiler", coeficiente: 0.111 })

const admin = new Usuario({
    nombre: "Juan Carlos", apellido: "Admin", email: "admin@tasahome.com", genero: "Hombre", contrasenia: "admin",
    domicilio: "Piedras 5000", fecha_nacimiento: new Date(1989, 1, 30),
    esAdmin: true
})

const inactivo = new Usuario({
    nombre: "Marcelo", apellido: "Tinelli", email: "mtinelli@tasahome.com", genero: "Hombre", contrasenia: "cabezon",
    domicilio: "Corrientes 3150", fecha_nacimiento: new Date(1975, 1, 30),
    estado: "Inactivo"
})

export const geronimo = new Usuario({
    nombre: "Geronimo", apellido: "Barrales", email: "gero@itgracevvx.com", genero: "Hombre", contrasenia: "gero",
    domicilio: "Laprida 4545", fecha_nacimiento: new Date(1992, 1, 7)
})


export const juan = new Usuario({
    nombre: "Juan", apellido: "Perez", email: "elantra87@itgracevvx.com", genero: "Hombre", contrasenia: "123",
    domicilio: "Laprida 4545", fecha_nacimiento: new Date(1987, 2, 5)
})

export const celeste = new Usuario({
    nombre: "Celeste", apellido: "Cid", email: "fafecar930@advew.com", genero: "Mujer", contrasenia: "cel",
    domicilio: "Aguero 3000", fecha_nacimiento: new Date(1999, 7, 12)
})

export const tasacion = new Tasacion({
    descripcion: "Tasación Villa Urquiza",
    direccion: "Plaza Gral. Lavalle, Talcahuano 610, C1013AAN CABA, Argentina",
    ambientes: 5,
    superficie: 250,
    fecha: new Date(2019,5,5),
    privada: false,
    barrio: villaUrquiza,
    usuario: juan,
    tipoDePropiedad: casa,
    tipoDeOperacion: venta,
    estado: bueno,
    servicios: [electricidad],
})

export const tasacion2 = new Tasacion({
    descripcion: "Tasación Recoleta",
    direccion: "Av. Corrientes 3000, C1193AAO CABA, Argentina",
    ambientes: 2,
    superficie: 80,
    fecha: new Date(2019,5,6),
    privada: false,
    barrio: recoleta,
    usuario: celeste,
    tipoDePropiedad: departamento,
    tipoDeOperacion: venta,
    estado: bueno,
    servicios: [electricidad],
})

tasacion.calcularValor(2541)
tasacion2.calcularValor(3194)

export const estados = [muy_malo, malo, regular, bueno, muy_bueno]

export const barrios = [constitucion, monserrat, puertoMadero, retiro, sanNicolas, sanTelmo, recoleta, balvanera, sanCristobal, barracas, boca, nuevaPompeya, parquePatricios, almagro, boedo, caballito, flores, parqueChacabuco, villaLugano, villaRiachuelo, villaSoldati, liniers, mataderos, parqueAvellaneda, floresta, monteCastro, velezSarsfield, versalles, villaLuro, villaReal, villaDelParque, villaDevoto, villaGralMitre, villaSantaRita, coghlan, saavedra, villaPueyrredon, villaUrquiza, belgrano, colegiales, nuniez, palermo, agronomia, chacarita, parqueChas, paternal, villaCrespo, villaOrtuzar]

export const comunas = [comuna01, comuna02, comuna03, comuna04, comuna05, comuna06, comuna07, comuna08, comuna09, comuna10, comuna11, comuna12, comuna13, comuna14, comuna15]

export const servicios = [gas_natural, electricidad, telefono, agua_corriente, desague_cloacal]

export const tipos_propiedad = [casa, departamento, ph]

export const tipos_operacion = [venta, alquiler]

export const usuarios = [juan, celeste, admin, inactivo, geronimo]
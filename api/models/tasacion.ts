import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Barrio } from "./barrio";
import { Estado } from "./estado";
import { Servicio } from "./servicio";
import { SitioPublicacion } from "./sitio_publicacion";
import { TipoOperacion } from "./tipo_operacion";
import { TipoPropiedad } from "./tipo_propiedad";
import { Usuario } from "./usuario";
import { ValuacionService } from "../servicios/valuacionService";
import { Valuacion } from "./valuacion";

@Entity()
export class Tasacion {

    constructor(init?: Partial<Tasacion>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column({ nullable: true })
    descripcion: string

    @Column({ nullable: true })
    ambientes: number

    @Column({ nullable: true })
    superficie: number

    @Column({ nullable: true })
    fecha: Date

    @Column({ nullable: true })
    valor: number

    @Column({ nullable: true })
    privada: boolean

    @Column({ nullable: true })
    direccion: string

    @Column({ nullable: true })
    id_anterior: number

    @ManyToOne(type => Usuario)
    @JoinColumn({ name: "id_usuario" })
    usuario: Usuario

    @ManyToOne(type => TipoPropiedad)
    @JoinColumn({ name: "id_tipo_propiedad" })
    tipoDePropiedad: TipoPropiedad

    @ManyToOne(type => TipoOperacion)
    @JoinColumn({ name: "id_tipo_operacion" })
    tipoDeOperacion: TipoOperacion

    @ManyToOne(type => Estado)
    @JoinColumn({ name: "id_estado" })
    estado: Estado

    @ManyToMany(type => Servicio)
    @JoinTable({ name: "servicio_tasacion" })
    servicios: Servicio[]

    @ManyToOne(type => Barrio)
    @JoinColumn({ name: "id_barrio" })
    barrio: Barrio

    validar() {
        this.validarCamposRequeridos()
        this.validarAmbientes()
        this.validarSuperficie()
    }

    validarCamposRequeridos() {
        if (this.ambientes == undefined) {
            throw "Debe ingresar cantidad de ambientes"
        }
        if (!this.superficie) {
            throw "Debe ingresar superficie"
        }
        if (!this.estado) {
            throw "Debe ingresar estado"
        }
        if (!this.tipoDeOperacion) {
            throw "Debe ingresar tipo de operación"
        }
        if (!this.tipoDePropiedad) {
            throw "Debe ingresar tipo de propiedad"
        }
        if (!this.direccion) {
            throw "Debe ingresar dirección"
        }
    }

    validarAmbientes() {
        if (this.ambientes < 1 || this.ambientes > 15) {
            throw "Los ambientes deben ser un valor entre 1 y 15"
        }

    }

    validarSuperficie() {
        if (this.superficie < 15 || this.superficie > 2000) {
            throw "La superficie debe ser un valor entre 15 y 2000"
        }

    }

    calcularValor(valorM2: number) {
        let servicios_incluidos = this.servicios.map(servicio => servicio.id)
        let tiene_agua = servicios_incluidos.includes(4)
        let tiene_electricidad = servicios_incluidos.includes(2)
        let coef_agua = 1
        if (!tiene_agua) { coef_agua = 0.95 }
        let coef_elec = 1
        if (!tiene_electricidad) { coef_elec = 0.95 }
        this.valor = Math.round(this.superficie *
            this.tipoDeOperacion.coeficiente *
            valorM2 *
            coef_agua * coef_elec * // servicios_basicos
            this.tipoDePropiedad.coeficiente *
            ((this.ambientes * 3) / 100 + 1) *
            this.estado.coeficiente *
            this.servicios.map(servicio => servicio.coeficiente).reduce(function (total, actual) {
                total = total * actual
                return total
            }, 1))
        //console.log(this.valor)
        //console.log(this)
        return this.valor
    }

    static fromJson(tasacionJson: string) {
        return Object.assign(new Tasacion(), tasacionJson)
    }
}
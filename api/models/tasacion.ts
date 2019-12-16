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
        if (!this.descripcion || !this.ambientes || !this.superficie || !this.fecha || !this.valor || !this.estado || !this.tipoDeOperacion || !this.tipoDePropiedad || !this.usuario) {
            throw "Tasacion inválida"
        }
    }


    calcularValor(valorM2: number) {
        // let indice_operacion = 1 //if (this.tipoDeOperacion.id == 1) {1} else {0.125}
        this.valor = this.superficie *
            this.tipoDeOperacion.coeficiente *
            valorM2 * 
            this.tipoDePropiedad.coeficiente *
            ((this.ambientes * 3) / 100 + 1) *
            this.estado.coeficiente *
            this.servicios.map(servicio => servicio.coeficiente).reduce(function (total, actual) {
                total = total * actual
                return total
            }, 1)
        console.log(this.valor)
        console.log(this)
        return this.valor
    }

    static fromJson(tasacionJson: string) {
        return Object.assign(new Tasacion(), tasacionJson)
    }
}
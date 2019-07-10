import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Barrio } from "./barrio";
import { Estado } from "./estado";
import { Servicio } from "./servicio";
import { SitioPublicacion } from "./sitio_publicacion";
import { TipoOperacion } from "./tipo_operacion";
import { TipoPropiedad } from "./tipo_propiedad";
import { Usuario } from "./usuario";

@Entity()
export class Tasacion {

    constructor(init?: Partial<Tasacion>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column({ nullable: true })
    descripcion: String

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
    direccion: String

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

    calcularValor() {
        this.valor = this.superficie *
            this.tipoDeOperacion.precioBase *
            this.tipoDePropiedad.coeficiente *
            ((this.ambientes * 3) / 100 + 1) *
            this.estado.coeficiente *
            this.servicios.map(servicio => servicio.coeficiente).reduce(function (total, actual) {
                total = total * actual
                return total
            }, 1)

        return this.valor
        // (await this.servicios).coeficiente //iterar por los servicios
    }

    static fromJson(tasacionJson: String) {
        return Object.assign(new Tasacion(), tasacionJson)
    }
}
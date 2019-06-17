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
    id: number

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

    @ManyToOne(type => Usuario)
    @JoinColumn({ name: "id_usuario" })
    usuario: Promise<Usuario>;

    @ManyToOne(type => TipoPropiedad)
    @JoinColumn({ name: "id_tipo_propiedad" })
    tipoDePropiedad: Promise<TipoPropiedad>

    @ManyToOne(type => TipoOperacion)
    @JoinColumn({ name: "id_tipo_operacion" })
    tipoDeOperacion: Promise<TipoOperacion>

    @ManyToOne(type => Estado)
    @JoinColumn({ name: "id_estado" })
    estado: Promise<Estado>

    @ManyToMany(type => Servicio)
    @JoinTable({ name: "servicio_tasacion" })
    servicios: Promise<Servicio[]>;

    @ManyToMany(type => SitioPublicacion)
    @JoinTable({ name: "sitio_tasacion" })
    sitios_publicados: Promise<SitioPublicacion[]>;

    @ManyToOne(type => Barrio)
    @JoinColumn({ name: "id_barrio" })
    barrio: Promise<Barrio>;

    validar() {
        if (!this.descripcion || !this.ambientes || !this.superficie || !this.fecha || !this.valor) {
            throw "Tasacion inválida"
        }
    }

    calcularValor() {
        this.valor = 200
        return this.valor
    }

    static fromJson(tasacionJson: String) {
        return Object.assign(new Tasacion(), tasacionJson)
    }
}
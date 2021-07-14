import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Servicio {

    constructor(init?: Partial<Servicio>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: string

    @Column("decimal", { nullable: true, precision: 20, scale: 10 })
    coeficiente: number

    chequeado: boolean = false

    static fromJson(servicioJSON: any) {
        let servicio = Object.assign(new Servicio(), servicioJSON)
        return servicio
    }
}
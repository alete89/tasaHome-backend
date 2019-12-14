import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Configuracion {

    constructor(init?: Partial<Configuracion>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: string

    @CreateDateColumn()
    fecha_actualizacion: Date

    @Column({ default: true })
    vigente: boolean

}
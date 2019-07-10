import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SitioPublicacion {

    constructor(init?: Partial<SitioPublicacion>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: string

    @Column({ nullable: true })
    logo_url: string

    @Column()
    url_publicar: string

    @Column({ nullable: true })
    fecha: boolean
}
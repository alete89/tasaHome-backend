import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SitioPublicacion {

    constructor(init?: Partial<SitioPublicacion>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: String

    @Column({ nullable: true })
    logo_url: String

    @Column()
    url_publicar: String

    @Column({ nullable: true })
    fecha: boolean
}
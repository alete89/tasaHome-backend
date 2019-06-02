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
   
    @Column()
    fecha: boolean
}
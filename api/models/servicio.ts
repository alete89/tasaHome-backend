import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Servicio {

    constructor(init?: Partial<Servicio>) {
        Object.assign(this, init)
    }
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    descripcion: String
}
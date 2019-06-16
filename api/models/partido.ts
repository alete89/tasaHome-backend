import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Partido {

    constructor(init?: Partial<Partido>) {
        Object.assign(this, init)
    }
    
    @PrimaryGeneratedColumn()
    id: number
   
    @Column()
    descripcion: String
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provincia {

    constructor(init?: Partial<Provincia>) {
        Object.assign(this, init)
    }
   
    @PrimaryGeneratedColumn()
    id: number
   
    @Column()
    descripcion: String
}
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Barrio } from "./barrio";

@Entity()
export class Direccion {
    
    constructor(init?: Partial<Direccion>) {
        Object.assign(this, init)
    }
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    descripcion: String
    
    @ManyToOne(type => Barrio)
    @JoinColumn({ name: "id_barrio" })
    barrio: Barrio;
}
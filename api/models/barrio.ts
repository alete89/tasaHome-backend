import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Comuna } from "./comuna";

@Entity()
export class Barrio {
  
    constructor(init?: Partial<Barrio>) {
        Object.assign(this, init)
    }
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: string
    
    @ManyToOne(type => Comuna)
    @JoinColumn({ name: "id_comuna" })
    comuna: Comuna;
}
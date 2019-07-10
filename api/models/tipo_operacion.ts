import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoOperacion {

    constructor(init?: Partial<TipoOperacion>) {
        Object.assign(this, init)
    }
   
    @PrimaryGeneratedColumn()
    id: number
   
    @Column()
    descripcion: string

    @Column()
    precioBase: number
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoPropiedad {

    constructor(init?: Partial<TipoPropiedad>) {
        Object.assign(this, init)
    }
   
    @PrimaryGeneratedColumn()
    id: number
   
    @Column()
    descripcion: String

    @Column()
    coeficiente: number

}
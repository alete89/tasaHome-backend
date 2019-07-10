import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Estado {

    constructor(init?: Partial<Estado>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: string

    @Column("decimal", { nullable: true, precision: 20, scale: 10 })
    coeficiente: number
}
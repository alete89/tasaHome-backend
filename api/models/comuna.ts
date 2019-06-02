import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comuna {

    constructor(init?: Partial<Comuna>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: String
}
import { Between, Brackets, EntityRepository, getConnection, In, LessThan, MoreThan, MoreThanOrEqual, Not, Repository } from "typeorm";
import { Tasacion } from "../models/tasacion";
declare var require: any

@EntityRepository(Tasacion)
export class RepoTasaciones extends Repository<Tasacion> {

    moment = require('moment');
    MoreThanDate = (date: Date) => MoreThan(this.moment(date).format('YYYY-MM-DD HH:MM:SS'))
    LessThanDate = (date: Date) => LessThan(this.moment(date).format('YYYY-MM-DD HH:MM:SS'))

    async todasLasTasaciones() {
        try {
            return await this.find()
        } catch (e) {
            console.log(e)
        }
    }

    async searchById(id_tasacion: string) {
        // return await this.createQueryBuilder("tasacion").leftJoinAndSelect("tasacion.servicios", "servicio")
        //     .where("tasacion.id = :unId", { unId: id_tasacion }).getOne()
        return await this.findOneOrFail({
            join: {
                alias: "tasacion",
                leftJoinAndSelect: {
                    tipoDePropiedad: "tasacion.tipoDePropiedad",
                    tipoDeOperacion: "tasacion.tipoDeOperacion",
                    barrio: "tasacion.barrio",
                    estado: "tasacion.estado",
                    servicios: "tasacion.servicios"
                },
            },
            where: { id: id_tasacion }
        })

    }

    async noHayTasaciones() {
        try {
            return await this.count() == 0
        } catch (e) {
            console.log(e)
        }
    }

    async guardarTasaciones(tasaciones: Tasacion[]) {
        try {
            await this.save(tasaciones)
        } catch (e) {
            console.log(e)
        }
    }

    async tasacionesAnteriores(id_usuario: string) {
        let tasacion = await this.find({
            join: {
                alias: "tasacion",
                leftJoinAndSelect: {
                    tipoDePropiedad: "tasacion.tipoDePropiedad",
                    barrio: "tasacion.barrio",
                }
            }, where: { usuario: { id: id_usuario, } },
            order: {
                fecha: "DESC",
                id_anterior: "ASC"
            }
        })
        console.log(tasacion)
        return tasacion
    }

    async historial_tasacion(id_tasacion: string) {
        let tasacion = await this.find({
            join: {
                alias: "tasacion",
                leftJoinAndSelect: {
                    tipoDePropiedad: "tasacion.tipoDePropiedad",
                }
            },
            where: [
                { id: id_tasacion },
                { id_anterior: id_tasacion }
            ], order: {
                fecha: "ASC",
            }
        })

        return tasacion
    }

    async tasacionesSimilares(id_logueado: string, body: any) {

        const { ids_barrios, ambientes_minimos, id_tipo_propiedad, id_tipo_operacion, superficie_minima, fecha_desde } = body

        console.log("body", body)

        const condiciones: any =
        {
            usuario: { id: Not(id_logueado) },
            ...((ids_barrios && ids_barrios.length > 0) && { barrio: { id: In(ids_barrios) } }),
            ...(ambientes_minimos && { ambientes: MoreThanOrEqual(ambientes_minimos) }),
            ...((id_tipo_propiedad) && { tipoDePropiedad: { id: id_tipo_propiedad } }),
            ...((id_tipo_operacion) && { tipoDeOperacion: { id: id_tipo_operacion } }),
            ...(superficie_minima && { superficie: Between(superficie_minima, 10000) }),
            ...(fecha_desde && { fecha: this.MoreThanDate(new Date(fecha_desde)) }),
        }

        try {
            let tasaciones = await this.find({
                join: {
                    alias: "tasacion",
                    leftJoinAndSelect: {
                        tipoDePropiedad: "tasacion.tipoDePropiedad",
                        barrio: "tasacion.barrio",
                        usuario: "tasacion.usuario"
                    },
                },
                where:
                    condiciones
            })
            // console.log("Tasaciones: ", tasaciones)
            return tasaciones
        } catch (error) {
            return ("se produjo un error")
        }

    }


}
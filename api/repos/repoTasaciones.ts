import { Between, EntityRepository, In, MoreThanOrEqual, Not, Repository, MoreThan, LessThan } from "typeorm";
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

    async searchById(id_tasacion: number) {
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

    async tasacionesAnteriores(id_usuario: number) {
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

   async tasacionesSimilares(id_logueado: number, body: any) {
        const condiciones: any[] = [
          {
            usuario: { id: Not(id_logueado) },
            barrio: { id: In(body.ids_barrios) },
          },
          {
            usuario: { id: Not(id_logueado) },
            ambientes: MoreThanOrEqual(body.ambientes_minimos),
          },
          {
            usuario: { id: Not(id_logueado) },
            tipoDePropiedad: { id: body.id_tipo_propiedad },
          },
          {
            usuario: { id: Not(id_logueado) },
            tipoDeOperacion: { id: body.id_tipo_operacion },
          },
          {
            usuario: { id: Not(id_logueado) },
            superficie: Between(body.superficie_minima, 100000),
          },
        ]
        if (body.fecha_desde) {
          condiciones.push({
            usuario: { id: Not(id_logueado) },
            fecha: this.MoreThanDate(new Date(body.fecha_desde)),
          })
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
            console.log("Tasaciones: ", tasaciones)
            return tasaciones
        } catch (error) {
            return ("se produjo un error")
        }

    }

}
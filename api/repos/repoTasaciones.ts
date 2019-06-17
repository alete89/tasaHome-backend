import { Between, EntityRepository, Repository } from "typeorm";
import { Tasacion } from "../models/tasacion";

@EntityRepository(Tasacion)
export class RepoTasaciones extends Repository<Tasacion> {

    async todasLasTasaciones() {
        try {
            return await this.find()
        } catch (e) {
            console.log(e)
        }
    }

    async searchById(id: number) {
        return await this.findOne(id)
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
                    sitios_publicados: "tasacion.sitios_publicados"
                }
            }, where: { usuario: { id: id_usuario } }
        })
        console.log(tasacion)
        return tasacion
    }

    async tasacionesSimilares(body: any) {
        let tasaciones = await this.find({
            join: {
                alias: "tasacion",
                leftJoinAndSelect: {
                    tipoDePropiedad: "tasacion.tipoDePropiedad",
                    barrio: "tasacion.barrio"
                },
            },
            where: [
                { barrio: { id: body.id_barrio } },
                { ambientes: body.ambientes },
                { tipoDePropiedad: { id: body.id_tipo_propiedad } },
                { tipoDeOperacion: { id: body.id_tipo_operacion } },
                { superficie: Between(body.superficie_minima, 100000) }
            ]
        })
        console.log("Tasaciones: ", tasaciones)
        return tasaciones
    }

}
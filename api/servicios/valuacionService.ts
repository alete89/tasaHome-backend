import { getCustomRepository, getManager, getRepository } from 'typeorm';
import { Barrio } from "../models/barrio";
export class ValuacionService {

    constructor() {
    }

    async getValorM2(p_barrio: Barrio){
        let nombre_barrio = p_barrio.descripcion
        let barrio = await getRepository(Barrio).findOneOrFail({ descripcion: nombre_barrio })
        const entityManager = getManager()
        let query = await entityManager.query(
            "SELECT valor_m2" +
            " FROM valuacion" +
            " WHERE id_barrio = ?" +
            " AND vigente;"
            , [barrio.id]).catch(function (e) { console.log(e) })
        // console.log("fin query")
        return query[0].valor_m2
    }
}
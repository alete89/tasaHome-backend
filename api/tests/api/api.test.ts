import request from 'supertest'
import { getConnection } from "typeorm"
import { app, server } from "../../app/app"
import { comuna02, sanNicolas, tasacion } from '../../app/constantes'
import { Usuario } from '../../models/usuario'
import { createTypeormConn, setup } from "../../utils/testUtils"

jest.setTimeout(20000)

describe('API', () => {

    const api = request(app)

    beforeAll(async () => {
        await createTypeormConn(true)
        await setup()
    })

    describe('usuario', () => {


        beforeEach(async () => {
        })

        test('ruta default', async () => {
            await api
                .get('/')
                .expect(200)
        })

        test('get todos los usuarios', async () => {
            const response = await api
                .get('/usuarios')
                .expect(200)
                .expect("Content-Type", "application/json; charset=utf-8")

            expect(response.body).toHaveLength(5)
            expect(response.body[0].id).toBe(1)
            expect(response.body[0].nombre).toBe("Juan")
        })

        test('get usuario por id', async () => {
            const response = await api
                .get('/usuarios/1')
                .expect(200)
                .expect("Content-Type", "application/json; charset=utf-8")

            expect(response.body.id).toBe(1)
            expect(response.body.nombre).toBe("Juan")
        })

        test('get usuario por id not found', async () => {
            await api
                .get('/usuarios/100')
                .expect(404)
        })
        test('login correcto', async () => {
            const response = await api
                .post('/login')
                .send({ email: "elantra87@itgracevvx.com", contraseña: "123" })
                .expect(200)
            expect(response.body.nombre).toBe("Juan")
        })

        test('login email no existente', async () => {
            const response = await api
                .post('/login')
                .send({ email: "no-existe@sarasa.com", contraseña: "123" })
                .expect(400)
        })
        test('login password incorrecta', async () => {
            const response = await api
                .post('/login')
                .send({
                    email: "elantra87@itgracevvx.com", contraseña: "sarasa"
                })
                .expect(400)
        })

        test('get datos barrio', async () => {
            const response = await api
                .get(`/datos/barrio/${sanNicolas.id}`)
                .expect(200)

            expect(response.body.comisarias).toBe("1")
            expect(response.body.escuelas).toBe("0")
            expect(response.body.espacios_verdes).toBe("5")
            expect(response.body.hospitales).toBe("0")
        })

        test('get datos barrio inexistente', async () => {
            const response = await api
                .get(`/datos/barrio/99999`)
                .expect(200)

            expect(response.body.comisarias).toBe("0")
            expect(response.body.escuelas).toBe("0")
            expect(response.body.espacios_verdes).toBe("0")
            expect(response.body.hospitales).toBe("0")
        })

        test('get datos comuna', async () => {
            const response = await api
                .get(`/datos/comuna/${comuna02.id}`)
                .expect(200)

            expect(response.body.comisarias).toBe("0")
            expect(response.body.escuelas).toBe("1")
            expect(response.body.espacios_verdes).toBe("0")
            expect(response.body.hospitales).toBe("2")
        })

        test('get datos comuna inexistente', async () => {
            const response = await api
                .get(`/datos/comuna/99999`)
                .expect(200)

            expect(response.body.comisarias).toBe("0")
            expect(response.body.escuelas).toBe("0")
            expect(response.body.espacios_verdes).toBe("0")
            expect(response.body.hospitales).toBe("0")
        })
        test('get tasación por id', async () => {
            const response = await api
                .get(`/tasacion/1`)
                .expect(200)

            expect(response.body.id).toBe(1)
            expect(response.body.descripcion).toBe("Tasación Villa Urquiza")
            expect(response.body.ambientes).toBe(5)
        })



        test('get tasación por id not found', async () => {
            const response = await api
                .get(`/tasacion/9999`)
                .expect(404)
        })

        test('buscar tasaciones similares por barrios', async () => {
            const response = await api
                .put('/tasaciones_similares/3')
                .send({
                    ids_barrios: [1, 3, 7, 38]
                })
                .expect(200)

            expect(response.body).toHaveLength(2)
        })

        test('buscar tasaciones similares no incluye las propias', async () => {
            const response = await api
                .put('/tasaciones_similares/1')
                .send({
                    ids_barrios: [38]
                })
                .expect(200)

            expect(response.body).toHaveLength(0)
        })

        test('buscar tasaciones similares por barrios no encuentra ninguna', async () => {
            const response = await api
                .put('/tasaciones_similares/3')
                .send({
                    ids_barrios: [1]
                })
                .expect(200)

            expect(response.body).toHaveLength(0)
        })

        test('buscar tasaciones similares por barrios y ambientes mínimos', async () => {
            const response = await api
                .put('/tasaciones_similares/3')
                .send({
                    ids_barrios: [7, 38], ambientes_minimos: 4

                })
                .expect(200)

            expect(response.body).toHaveLength(1)
            expect(response.body[0].descripcion).toBe("Tasación Villa Urquiza")
            expect(response.body[0].ambientes).toBeGreaterThanOrEqual(4)
        })

        test('buscar tasaciones similares por tipo de operación', async () => {
            const response = await api
                .put('/tasaciones_similares/3')
                .send({
                    id_tipo_operacion: 1

                })
                .expect(200)

            expect(response.body).toHaveLength(2)
            expect(response.body[0].descripcion).toBe("Tasación Villa Urquiza")
            // expect(response.body[0].tipoDeOperacion.id).toBe(1)
        })

        test('buscar tasaciones similares por superficie mínima', async () => {
            const response = await api
                .put('/tasaciones_similares/3')
                .send({
                    superficie_minima: 100

                })
                .expect(200)

            expect(response.body).toHaveLength(1)
            expect(response.body[0].descripcion).toBe("Tasación Villa Urquiza")
            expect(response.body[0].superficie).toBeGreaterThanOrEqual(100)
        })


        test('buscar tasaciones similares por fecha', async () => {
            const fecha_busqueda = new Date(2019, 5, 5)
            const response = await api
                .put('/tasaciones_similares/3')
                .send({
                    fecha_desde: fecha_busqueda

                })
                .expect(200)

            expect(response.body).toHaveLength(1)
            expect(response.body[0].descripcion).toBe("Tasación Recoleta")
            expect(new Date(response.body[0].fecha).getTime()).toBeGreaterThanOrEqual(fecha_busqueda.getTime())
        })

        test('get tasaciones anteriores', async () => {
            const response = await api
                .get('/tasaciones_anteriores/1')
                .expect(200)

            expect(response.body).toHaveLength(1)
        })

        test('get tasaciones anteriores y no tiene ninguna', async () => {
            const response = await api
                .get('/tasaciones_anteriores/4')
                .expect(200)

            expect(response.body).toHaveLength(0)
        })
        test('get historial de una tasación', async () => {
            const response = await api
                .get('/historial_tasacion/1')
                .expect(200)

            expect(response.body).toHaveLength(1)
            expect(response.body[0].valor).toBe(871938)
        })
        test('get sitios de publicación', async () => {
            const response = await api
                .get('/sitios_publicacion')
                .expect(200)

            expect(response.body).toHaveLength(4)
            expect(response.body[0].descripcion).toBe("ZonaProp")
        })
        test('get barrios', async () => {
            const response = await api
                .get('/barrios')
                .expect(200)

            expect(response.body).toHaveLength(48)
        })

        test('get tipos de operacion', async () => {
            const response = await api
                .get('/tipos_operacion')
                .expect(200)

            expect(response.body).toHaveLength(2)
        })

        test('get escuelas', async () => {
            const response = await api
                .get('/escuelas')
                .expect(200)

            expect(response.body).toHaveLength(5)
        })

        test('get hospitales', async () => {
            const response = await api
                .get('/hospitales')
                .expect(200)

            expect(response.body).toHaveLength(5)
        })

        test('get comisarias', async () => {
            const response = await api
                .get('/comisarias')
                .expect(200)

            expect(response.body).toHaveLength(5)
        })
        test('get espacios verdes', async () => {
            const response = await api
                .get('/espacios-verdes')
                .expect(200)

            expect(response.body).toHaveLength(5)
        })

        test('get estados', async () => {
            const response = await api
                .get('/estados')
                .expect(200)

            expect(response.body).toHaveLength(5)
        })

        test('get servicios', async () => {
            const response = await api
                .get('/servicios')
                .expect(200)

            expect(response.body).toHaveLength(5)
        })

        test('get comunas', async () => {
            const response = await api
                .get('/comunas')
                .expect(200)

            expect(response.body).toHaveLength(15)
        })

        test('tasar propiedad cantidad de ambientes inválida devuelve bad request', async () => {
            const tasacionInvalida = Object.assign({}, tasacion)
            tasacionInvalida.ambientes = 200
            const response = await api
                .put('/tasar_propiedad')
                .send(tasacionInvalida)
                .expect(400)
        })

        test('tasar propiedad con superficie 0 devuelve bad request', async () => {
            const tasacionInvalida = Object.assign({}, tasacion)
            tasacionInvalida.superficie = 0
            const response = await api
                .put('/tasar_propiedad')
                .send(tasacionInvalida)
                .expect(400)
        })

        test('tasar propiedad válida devuelve valor calculado', async () => {
            const tasacionValida = Object.assign({}, tasacion)
            tasacionValida.id = undefined!
            tasacionValida.descripcion = "Tasación válida"
            tasacionValida.ambientes = 2
            tasacionValida.superficie = 150
            const response = await api
                .put('/tasar_propiedad')
                .send(tasacionValida)
                .expect(200)
            expect(response.text).toBe("507599")

        })

        test('guardar tasación válida', async () => {
            const tasacionValida = Object.assign({}, tasacion)
            tasacionValida.id = undefined!
            tasacionValida.descripcion = "Tasación válida"
            tasacionValida.ambientes = 2
            tasacionValida.superficie = 150
            const response = await api
                .post('/guardar_tasacion/1')
                .send(tasacionValida)
                .expect(200)
        })

        test('guardar tasación inválida devuelve bad request', async () => {
            const tasacionInvalida = Object.assign({}, tasacion)
            tasacionInvalida.ambientes = 200
            const response = await api
                .post('/guardar_tasacion/1')
                .send(tasacionInvalida)
                .expect(400)
        })

        test('registrar usuario válido', async () => {
            const usuarioValido = new Usuario({
                nombre: "Marcela", apellido: "Basterrica", email: "marce@itgracevvx.com", genero: "Mujer", contrasenia: "12345678",
                domicilio: "Formosa 4545", fecha_nacimiento: new Date(1982, 2, 5)
            })
            const response = await api
                .post('/registrar_usuario')
                .send(usuarioValido)
                .expect(200)
        })

        test('registrar usuario ya existente genera bad request', async () => {
            const usuarioValido = new Usuario({
                nombre: "Marcela", apellido: "Basterrica", email: "elantra87@itgracevvx.com", genero: "Mujer", contrasenia: "12345678",
                domicilio: "Formosa 4545", fecha_nacimiento: new Date(1982, 2, 5)
            })
            const response = await api
                .post('/registrar_usuario')
                .send(usuarioValido)
                .expect(400)
        })


        test('registrar usuario inválido (contraseña muy corta) devuelve bad request', async () => {
            const usuarioInvalido = new Usuario({
                nombre: "Marcela", apellido: "Basterrica", email: "contraseña@corta.com", genero: "Mujer", contrasenia: "123",
                domicilio: "Formosa 4545", fecha_nacimiento: new Date(1993, 2, 5)
            })
            const response = await api
                .post('/registrar_usuario')
                .send(usuarioInvalido)
                .expect(400)
        })

        test('registrar usuario inválido (falta nombre) devuelve bad request', async () => {
            const usuarioInvalido = new Usuario({
                apellido: "Basterrica", email: "falta@nombre.com", genero: "Mujer", contrasenia: "123456789",
                domicilio: "Formosa 4545", fecha_nacimiento: new Date(1993, 2, 5)
            })
            const response = await api
                .post('/registrar_usuario')
                .send(usuarioInvalido)
                .expect(400)
        })

        test('registrar usuario inválido (menor de edad) devuelve bad request', async () => {
            const usuarioInvalido = new Usuario({
                nombre: "Marcela", apellido: "Basterrica", email: "menor@de_edad.com", genero: "Mujer", contrasenia: "123456789",
                domicilio: "Formosa 4545", fecha_nacimiento: new Date()
            })
            const response = await api
                .post('/registrar_usuario')
                .send(usuarioInvalido)
                .expect(400)
        })

    })

    describe('administrador', () => {
        test('buscar usuarios sin criterios de búsqueda devuelve a todos', async () => {
            const response = await api
                .get('/administracion')
                .expect(200)
            expect(response.body).toHaveLength(5)
        })

        test('buscar usuarios con una tasación devuelve a dos', async () => {
            const response = await api
                .get('/administracion')
                .expect(200)
                .query({ cant_tasaciones: 1 })

            expect(response.body).toHaveLength(2)
        })

        test('buscar usuarios con muchas tasaciones no devuelve ninguno', async () => {
            const response = await api
                .get('/administracion')
                .expect(200)
                .query({ cant_tasaciones: 5 })

            expect(response.body).toHaveLength(0)
        })

        test('buscar usuarios activos devuelve 4', async () => {
            const response = await api
                .get('/administracion')
                .expect(200)
                .query({ estado: "activo" })

            expect(response.body).toHaveLength(4)
        })

        test('buscar configuraciones ok', async () => {
            const response = await api
                .get('/configuracion')
                .expect(200)

            expect(response.body).toHaveLength(5)
        })

    })


    afterAll(async () => {
        await getConnection().close()
        server.close()
    })


})
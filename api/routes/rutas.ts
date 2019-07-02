import express = require('express');
import { getCustomRepository, getManager, getRepository } from 'typeorm';
import { Barrio } from '../models/barrio';
import { Comuna } from '../models/comuna';
import { Domicilio } from '../models/domicilio';
import { Localidad } from '../models/localidad';
import { Partido } from '../models/partido';
import { Provincia } from '../models/provincia';
import { Tasacion } from '../models/tasacion';
import { TipoOperacion } from '../models/tipo_operacion';
import { TipoPropiedad } from '../models/tipo_propiedad';
import { Usuario } from '../models/usuario';
import { RepoTasaciones } from '../repos/repoTasaciones';
import { RepoUsuarios } from '../repos/repoUsuarios';
import { Estado } from '../models/estado';
import { Servicio } from '../models/servicio';
import { EmailService } from '../servicios/emailService';
import { SitioPublicacion } from '../models/sitio_publicacion';
import { Escuela } from '../models/escuela';

// 'use strict';
module.exports = function (app: express.Application) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
        next();
    });

    app.route('/registrar_usuario')
        .get(async function (req, res) {
            let usuario = Usuario.fromJson(req.body);
            // usuario.validar()
            await getCustomRepository(RepoUsuarios).guardarUsuarios([usuario])
            res.send("OK")
        });

    app.route('/usuarios')
        .get(async function (req, res) {
            res.send(await getCustomRepository(RepoUsuarios).todosLosUsuarios());
        });

    app.route('/usuarios/:id')
        .get(async function (req, res) {
            res.send(await getCustomRepository(RepoUsuarios).searchById(req.params.id));
        });

    app.route('/login')
        .post(async function (req, res) {
            try {
                res.send(await getCustomRepository(RepoUsuarios).login(req.body.email, req.body.contraseña))
            } catch (error) {
                res.status(400).send({
                    message: error
                });
            }
        });

    app.route('/usuarios/recuperar_contraseña')
        .get(async function (req, res) {
            res.send(await getCustomRepository(RepoUsuarios).recuperarContraseña(req.body.email));
        });

    app.route('/datos/barrio/:id')
        .get(async function (req, res) {
            const entityManager = getManager()
            let id_barrio = req.params.id
            let query = await entityManager.query(
                "SELECT" +
                "(SELECT count(*) FROM tasaHome.escuela as escuela WHERE escuela.id_barrio = ?) as escuelas," +
                "(SELECT count(*) FROM tasaHome.hospital as hospital WHERE hospital.id_barrio = ?) as hospitales," +
                "(SELECT count(*) FROM tasaHome.comisaria as comisaria WHERE comisaria.id_barrio = ?) as comisarias," +
                "(SELECT count(*) FROM tasaHome.espacio_verde as espacio WHERE espacio.id_barrio = ?) as espacios_verdes;"
                , [id_barrio, id_barrio, id_barrio, id_barrio]).catch(function (e) { console.log(e) })
            res.send(query[0])
        });


    app.route('/datos/comuna/:id')
        .get(async function (req, res) {
            const entityManager = getManager()
            let id_comuna = req.params.id
            let query = await entityManager.query(
                "SELECT" +
                "(SELECT count(*) FROM tasaHome.escuela as escuela WHERE escuela.id_barrio in (select id from barrio where id_comuna = ?)) as escuelas," +
                "(SELECT count(*) FROM tasaHome.hospital as hospital WHERE hospital.id_barrio in (select id from barrio where id_comuna = ?)) as hospitales," +
                "(SELECT count(*) FROM tasaHome.comisaria as comisaria WHERE comisaria.id_barrio in (select id from barrio where id_comuna = ?)) as comisarias," +
                "(SELECT count(*) FROM tasaHome.espacio_verde as espacio WHERE espacio.id_barrio in (select id from barrio where id_comuna = ?)) as espacios_verdes;"
                , [id_comuna, id_comuna, id_comuna, id_comuna]).catch(function (e) { console.log(e) })
            res.send(query[0])
        });

    app.route('/tasacion/:id')
        .get(async function (req, res) {
            console.log(await getCustomRepository(RepoTasaciones).searchById(req.params.id))
            res.send(await getCustomRepository(RepoTasaciones).searchById(req.params.id));
        });

    app.route('/tasaciones_similares/:id')
        .put(async function (req, res) {
            let tasaciones_similares = await getCustomRepository(RepoTasaciones).tasacionesSimilares(req.params.id, req.body)
            // console.log(tasaciones_similares)
            res.send(tasaciones_similares)
        });

    app.route('/tasaciones_anteriores/:id')
        .get(async function (req, res) {
            let id_usuario = req.params.id
            res.send(await getCustomRepository(RepoTasaciones).tasacionesAnteriores(id_usuario))
        });

    app.route('/historial_tasacion/:id')
        .get(async function (req, res) {
            let id_tasacion = req.params.id
            res.send(await getCustomRepository(RepoTasaciones).historial_tasacion(id_tasacion))
        });

    app.route('/usuarios/contactar_usuario')
        .get(async function (req, res) {
            res.send(await getCustomRepository(RepoUsuarios).contactar_usuario(req.body.email, req.body.mensaje));
        });

    app.route('/tasar_propiedad')
        .put(async function (req, res) {
            let tasacion = Tasacion.fromJson(req.body);
            tasacion.tipoDePropiedad = await getRepository(TipoPropiedad).findOneOrFail(req.body.tipoDePropiedad.id)
            tasacion.tipoDeOperacion = await getRepository(TipoOperacion).findOneOrFail(req.body.tipoDeOperacion.id)
            tasacion.estado = await getRepository(Estado).findOneOrFail(req.body.estado.id)
            let valor = tasacion.calcularValor()
            // tasacion.validar()
            res.send(JSON.stringify(valor))
        });

    app.route('/guardar_tasacion/:id')
        .post(async function (req, res) {
            try {
                let id_usuario = req.params.id
                let tasacion: Tasacion = Tasacion.fromJson(req.body);
                tasacion.tipoDeOperacion = req.body.tipoDeOperacion
                tasacion.tipoDePropiedad = req.body.tipoDePropiedad
                tasacion.estado = req.body.estado
                tasacion.fecha = new Date()
                tasacion.descripcion = tasacion.direccion
                tasacion.usuario = id_usuario
                tasacion.validar()
                if (req.body.id) {
                    if (req.body.id_anterior) {
                        tasacion.id_anterior = req.body.id_anterior
                        tasacion.id = undefined
                    } else {
                        tasacion.id_anterior = req.body.id
                        tasacion.id = undefined
                    }
                }
                await getCustomRepository(RepoTasaciones).guardarTasaciones([tasacion])
            } catch (error) {
                res.status(400).send({
                    message: error
                });
            }
            res.send("OK")
        });

    app.route('/registrar_usuario')
        .post(async function (req, res) {
            try {
                let usuario = Usuario.fromJson(req.body)
                console.log(req.body)
                let domicilio = new Domicilio()
                domicilio.localidad = req.body.localidad
                domicilio.partido = req.body.partido
                domicilio.provincia = req.body.provincia
                domicilio.descripcion = req.body.direccion
                await getRepository(Domicilio).save(domicilio)
                usuario.domicilio = domicilio
                usuario.edad = new Date().getFullYear() - new Date(req.body.fecha_nacimiento).getFullYear()
                usuario.validar()
                await getCustomRepository(RepoUsuarios).guardarUsuarios([usuario])
            } catch (error) {
                res.status(400).send({
                    message: error
                });
            }
            res.send("OK")
        });

    app.route('/sitios_publicacion')
        .get(async function (req, res) {
            try {
                let sitios_publicacion = await getRepository(SitioPublicacion).find()
                res.send(sitios_publicacion)
            } catch (error) {
                res.status(400).send({
                    message: error
                })
            }
        })

    app.route('/publicar_tasacion')
        .get(async function (req, res) {
            //TODO
            res.send("OK")
        });

    app.route('/provincias')
        .get(async function (req, res) {
            try {
                let provincias = await getRepository(Provincia).find()
                res.send(provincias)
            } catch (error) {
                res.status(400).send({
                    message: error
                })
            }
        })

    app.route('/partidos/:id')
        .get(async function (req, res) {
            try {
                let partidos = await getRepository(Partido).find({ where: { provincia: req.params.id } })
                res.send(partidos)
            } catch (error) {
                res.status(400).send({
                    message: error
                })
            }
        })

    app.route('/localidades/:id')
        .get(async function (req, res) {
            try {
                let localidades = await getRepository(Localidad).find({ where: { partido: req.params.id } })
                res.send(localidades)
            } catch (error) {
                res.status(400).send({
                    message: error
                })
            }
        })


    app.route('/barrios')
        .get(async function (req, res) {
            try {
                let barrios = await getRepository(Barrio).find({order: {descripcion: "ASC"}})
                res.send(barrios)
            } catch (error) {
                res.status(400).send({
                    message: error
                })
            }
        })

    app.route('/tipos_propiedad')
        .get(async function (req, res) {
            try {
                let tipos_de_propiedad = await getRepository(TipoPropiedad).find()
                res.send(tipos_de_propiedad)
            } catch (error) {
                res.status(400).send({
                    message: error
                })
            }
        })


    app.route('/tipos_operacion')
        .get(async function (req, res) {
            try {
                let tipos_de_operacion = await getRepository(TipoOperacion).find()
                res.send(tipos_de_operacion)
            } catch (error) {
                res.status(400).send({
                    message: error
                })
            }
        })

    app.route('/estados')
        .get(async function (req, res) {
            try {
                let estados = await getRepository(Estado).find()
                res.send(estados)
            } catch (error) {
                res.status(400).send({
                    message: error
                })
            }
        })

    app.route('/escuelas')
        .get(async function (req, res) {
            try {
                let escuelas = await getRepository(Escuela).find()
                res.send(escuelas)
            } catch (error) {
                res.status(400).send({
                    message: error
                })
            }
        })

    app.route('/servicios')
        .get(async function (req, res) {
            try {
                let servicios = await getRepository(Servicio).find()
                res.send(servicios)
            } catch (error) {
                res.status(400).send({
                    message: error
                })
            }
        })

    app.route('/comunas')
        .get(async function (req, res) {
            try {
                let comunas = await getRepository(Comuna).find()
                res.send(comunas)
            } catch (error) {
                res.status(400).send({
                    message: error
                })
            }
        })

    app.route('/enviar_mensaje/:id')
        .post(async function (req, res) {
            try {
                let usuario_emisor: Usuario = await getCustomRepository(RepoUsuarios).searchById(req.params.id)
                let email_receptor = req.body.email_receptor
                let mensaje = req.body.mensaje
                let email_service = new EmailService()
                email_service.enviarEmail(usuario_emisor, email_receptor, mensaje)
                res.send("OK")
            } catch (error) {
                res.status(400).send({
                    message: error
                })
            }

        });

    app.route('/')
        .get(function (req, res) {
            res.send('Bienvenido a Tasa Home!');
        });


};
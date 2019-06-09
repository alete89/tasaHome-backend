import express = require('express');
import { createConnection, getCustomRepository, getManager } from 'typeorm';
import { Tasacion } from '../models/tasacion';
import { RepoTasaciones } from '../repos/repoTasaciones';
import { RepoUsuarios } from '../repos/repoUsuarios';
import { Usuario } from '../models/usuario';

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
            let conexion = await createConnection()
            let usuario = Usuario.fromJson(req.body);
            // usuario.validar()
            await getCustomRepository(RepoUsuarios).guardarUsuarios([usuario])
            res.send("OK")
            conexion.close()
        });

    app.route('/usuarios')
        .get(async function (req, res) {
            let conexion = await createConnection()
            res.send(await getCustomRepository(RepoUsuarios).todosLosUsuarios());
            conexion.close()
        });

    app.route('/usuarios/:id')
        .get(async function (req, res) {
            let conexion = await createConnection()
            res.send(await getCustomRepository(RepoUsuarios).searchById(req.params.id));
            conexion.close()
        });

    app.route('/login')
        .post(async function (req, res) {
            let conexion = await createConnection()
            try {
            res.send(await getCustomRepository(RepoUsuarios).login(req.body.email, req.body.contraseña))
            } catch (error) {
                res.status(400).send({
                    message: error
                });
            } finally {
            conexion.close()
            }
        });

    app.route('/usuarios/recuperar_contraseña')
        .get(async function (req, res) {
            let conexion = await createConnection()
            res.send(await getCustomRepository(RepoUsuarios).recuperarContraseña(req.body.email));
            conexion.close()
        });

    app.route('/datos/barrio/:id')
        .get(async function (req, res) {
            let conexion = await createConnection()
            const entityManager = getManager()
            let id_barrio = req.params.id
            let query = await entityManager.query(
                "SELECT" +
                "(SELECT count(*) FROM tasahome.escuela as escuela WHERE escuela.id_barrio = ?) as escuelas," +
                "(SELECT count(*) FROM tasahome.hospital as hospital WHERE hospital.id_barrio = ?) as hospitales," +
                "(SELECT count(*) FROM tasahome.comisaria as comisaria WHERE comisaria.id_barrio = ?) as comisarias," +
                "(SELECT count(*) FROM tasahome.espacio_verde as espacio WHERE espacio.id_barrio = ?) as espacios_verdes;"
                , [id_barrio, id_barrio, id_barrio, id_barrio]).catch(function (e) { console.log(e) })
            res.send(query[0])
            conexion.close()
        });

    app.route('/tasaciones/:id')
        .get(async function (req, res) {
            let conexion = await createConnection()
            res.send(await getCustomRepository(RepoTasaciones).searchById(req.params.id));
            conexion.close()
        });

    app.route('/tasaciones_similares/:id')
        .get(async function (req, res) {
            let conexion = await createConnection()
            res.send(await getCustomRepository(RepoTasaciones).tasacionesSimilares(req.body))
            conexion.close()
        });

    app.route('/tasaciones_anteriores/:id')
        .get(async function (req, res) {
            let conexion = await createConnection()
            let id_usuario = req.params.id
            res.send(await getCustomRepository(RepoTasaciones).tasacionesAnteriores(id_usuario))
            conexion.close()
        });

    app.route('/usuarios/contactar_usuario')
        .get(async function (req, res) {
            let conexion = await createConnection()
            res.send(await getCustomRepository(RepoUsuarios).contactar_usuario(req.body.email, req.body.mensaje));
            conexion.close()
        });

    app.route('/tasar_propiedad')
        .get(async function (req, res) {
            let conexion = await createConnection()
            let tasacion = Tasacion.fromJson(req.body);
            // tasacion.validar()
            let valor = tasacion.calcularValor()
            res.send(JSON.stringify(valor))
            conexion.close()
        });

    app.route('/guardar_tasacion')
        .get(async function (req, res) {
            let conexion = await createConnection()
            let tasacion = Tasacion.fromJson(req.body);
            // tasacion.validar()
            await getCustomRepository(RepoTasaciones).guardarTasaciones([tasacion])
            res.send("OK")
            conexion.close()
        });

    app.route('/publicar_tasacion')
        .get(async function (req, res) {
            let conexion = await createConnection()
            //TODO
            res.send("OK")
            conexion.close()
        });

    app.route('/')
        .get(function (req, res) {
            res.send('Bienvenido a Tasa Home!');
        });


};
import express = require('express');
import { createConnection, getCustomRepository } from 'typeorm';
import { RepoUsuarios } from '../repos/repoUsuarios';

// 'use strict';
module.exports = function (app: express.Application) {

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
        .get(async function (req, res) {
            let conexion = await createConnection()
            res.send(await getCustomRepository(RepoUsuarios).login(req.body.email, req.body.contraseña))
            conexion.close()
        });

    app.route('/')
        .get(function (req, res) {
            res.send('Bienvenido a Tasa Home!');
        });
};
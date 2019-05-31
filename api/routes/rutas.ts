import express = require('express');
import { getRepository, getCustomRepository, createConnection } from 'typeorm';
import { Usuario } from '../models/usuario';
import { RepoUsuarios } from '../repos/repoUsuarios';

// 'use strict';
module.exports = function (app: express.Application) {

    app.route('/usuarios')
        .get(async function (req, res) {
            let conexion = await createConnection()
            res.send(await getCustomRepository(RepoUsuarios).todosLosUsuarios());
            conexion.close()
        });

    app.route('/')
        .get(function (req, res) {
            res.send('Bienvenido a Tasa Home!');
        });
};
import express = require('express');
import { UsuariosController } from '../controllers/usuariosController';

// 'use strict';
module.exports = function (app: express.Application) {
    var usuariosController = new UsuariosController()

    app.route('/usuarios')
        .get(async function (req, res) {
            res.send(await usuariosController.todosLosUsuarios());
        });

    app.route('/')
        .get(function (req, res) {
            res.send('Bienvenido a Tasa Home!');
        });
};
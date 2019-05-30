import express = require('express');
import { usuarios } from './Bootstrap';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Usuario } from '../model/Usuario';


async function crearConexion() {
    // createConnection method will automatically read connection options
    // from your ormconfig file or environment variables
    const connection = await createConnection();
    return connection
}

// Create a new express application instance
const app: express.Application = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/usuarios/', async function (req, res) {
    res.send(await traerLosUsuarios());
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

async function guardarUnUsuario() {
    let conexion = await crearConexion()
    await conexion.manager.save(usuarios)
}

async function traerLosUsuarios() {
    try {

        let conexion = await crearConexion()
        // let usuarios = await conexion.manager
        let usuarios = await conexion.manager.find(Usuario)
        // .getRepository(Usuario)
        // .createQueryBuilder("user")
        // // .where("user.id = :id", { id: 1 })
        conexion.close()
        return usuarios
    }
    catch (e) {
        console.log(e)
    }
}


// guardarUnUsuario()
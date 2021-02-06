import express = require('express');
import "reflect-metadata";
import { Bootstrap } from './bootstrap';
import { createConnection } from "typeorm";
require('dotenv').config()

// Create a new express application instance
const app: express.Application = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

const port = process.env.PORT || 9000;

const bootstrap = new Bootstrap()

var routes = require('../routes/rutas'); //importing route
routes(app);

app.listen(port, function () {
    console.log('Example app listening on port ', port, '!');
});

async function run() {
    await createConnection()
}

async function runBootstrap() {
    await bootstrap.run()
}

runBootstrap()
run()
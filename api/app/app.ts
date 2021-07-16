import express from 'express';
import "reflect-metadata";
import { createTypeormConn } from '../utils/testUtils';
import { Bootstrap } from './bootstrap';
require('dotenv').config()

// Create a new express application instance
 const app: express.Application = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

const port = process.env.PORT || 9000;

const bootstrap = new Bootstrap()

var routes = require('../routes/rutas'); //importing route
routes(app);

const server = app.listen(port, function () {
    // console.log('Example app listening on port ', port, '!');
});

async function run() {
    if(process.env.NODE_ENV == "development") {
        await createTypeormConn()
        await runBootstrap()
    }
    console.log('Example app listening on port ', port, '!');

}

export async function runBootstrap() {
    await bootstrap.run()
}

run()

export { app, server}

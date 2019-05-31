import express = require('express');
import "reflect-metadata";
import { Bootstrap } from './bootstrap';

// Create a new express application instance
const app: express.Application = express();

const port = process.env.PORT || 3000;

const bootstrap = new Bootstrap()

var routes = require('../routes/rutas'); //importing route
routes(app);

app.listen(port, function () {
    console.log('Example app listening on port ', port, '!');
});

async function run() {
    await bootstrap.run()
}

run()
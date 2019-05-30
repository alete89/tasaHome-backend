import express = require('express');
import { usuarios } from './Bootstrap';

// Create a new express application instance
const app: express.Application = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/usuarios/', function (req, res) {
    res.send(usuarios);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
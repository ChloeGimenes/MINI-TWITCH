const express = require('express');
const bodyParser = require('body-parser');
const morgan = require ('morgan');
const expressServer = express();
const router = require('./route');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.set('useCreateIndex', true);


//Connection à la base de données créée sur MongoDB:
mongoose.connect('mongodb+srv://chloe:chloe@cluster0.tarb8.mongodb.net/cluster0?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true  }
);
mongoose.connection
    .once("open", () => console.log('connecté à MongoDB'))
    .on('error', error => console.log('Erreur de connection à MongoDB', error));


//Connection au serveur:
expressServer.use(morgan('combined'));
expressServer.use(bodyParser.json({type: '*/*'}));
expressServer.use(cors());

const port = 3090;
const server = http.createServer(expressServer);
router(expressServer);
server.listen(port);

console.log('le serveur ecoute sur le port:', port)
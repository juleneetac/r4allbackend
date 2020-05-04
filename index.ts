"use strict";
//¡¡¡¡¡¡¡¡¡IMPORTANTE: EL NOMBRE DE LAS COLECCIONES EN MINUSCULA PORQUE SINO NO LAS DETECTA!!!!!!!!!
//Import libraries
import express = require("express");
import mongoose = require("mongoose");
import cors = require("cors");
import bodyParser = require('body-parser');
import morgan = require("morgan");

//
import multer from './libs/multer';
import path = require('path');
var socket = require('socket.io');

//Import routes
let usuariosRouter = require("./routes/UsuariosRoutes"); //variable con la ruta usuarios
let torneosRouter = require("./routes/TorneosRoutes"); //variable con la ruta torneos
let partidasRouter = require("./routes/PartidasRoutes"); //variable con la ruta partidas
let participantesRouter = require("./routes/ParticipantesRoutes"); //variable con la ruta participantes
let mensajesRouter = require("./routes/MensajesRoutes"); //variable con la ruta mensajes
let chatsRouter = require("./routes/ChatsRoutes"); //variable con la ruta chats

//
let profileRouter = require("./routes/ProfileRoutes"); //variable con la ruta perfil

//Server variable initialization
let app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json()); //para poder enviar json con el POST

//
app.use('/uploads', express.static(path.resolve('uploads')));

app.use('/usr', usuariosRouter);   //students
app.use('/trn', torneosRouter);   //subjects
app.use('/prd', partidasRouter);   //students
app.use('/prantes', participantesRouter);   //subjects
app.use('/msg', mensajesRouter);   //students
app.use('/cht', chatsRouter);   //subjects

//
app.use('/perfil', profileRouter);  //esto es de prueba del bernat

//Mongo database connection
let rutadb = process.env.DB_CONNECTION||"mongodb://127.0.0.1:27017/r4all"
mongoose.connect(rutadb, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(function () {
    console.log('Mongodb connection OK\n');
}).catch(function (err) {
    console.log("Database error: " + err.message);
});

//Make app listen on port 7000
const port = 7000; // en el puerto que vamos a escuchar
const server = app.listen(port, function () {
    console.log('Listening on http://localhost:' + port);
});

//sockets
//server del chat
//Socket setup for conexion of every client
const io = socket(server);

module.exports = app;

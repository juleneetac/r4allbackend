"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//¡¡¡¡¡¡¡¡¡IMPORTANTE: EL NOMBRE DE LAS COLECCIONES EN MINUSCULA PORQUE SINO NO LAS DETECTA!!!!!!!!!
//Import libraries
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
//Import routes
var studentsRouter = require("./routes/StudentsRoutes"); //variable con la ruta students
var subjectsRouter = require("./routes/SubjectsRoutes"); //variable con la ruta subjects
var usuariosRouter = require("./routes/UsuariosRoutes"); //variable con la ruta usuarios
var torneosRouter = require("./routes/TorneosRoutes"); //variable con la ruta torneos
var partidasRouter = require("./routes/PartidasRoutes"); //variable con la ruta partidas
var participantesRouter = require("./routes/ParticipantesRoutes"); //variable con la ruta participantes
var mensajesRouter = require("./routes/MensajesRoutes"); //variable con la ruta mensajes
var chatsRouter = require("./routes/ChatsRoutes"); //variable con la ruta chats
//Server variable initialization
var app = express();
app.use(cors());
app.use(bodyParser.json()); //para poder enviar json con el POST
app.use('/estudiantes', studentsRouter); //students
app.use('/asignaturas', subjectsRouter); //subjects
app.use('/usr', usuariosRouter); //students
app.use('/trn', torneosRouter); //subjects
app.use('/prd', partidasRouter); //students
app.use('/prantes', participantesRouter); //subjects
app.use('/msg', mensajesRouter); //students
app.use('/cht', chatsRouter); //subjects
//Mongo database connection
mongoose.connect("mongodb://127.0.0.1:27017/r4all", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(function () {
    console.log('Conexion con db OK');
}).catch(function (err) {
    console.log("Database error: " + err.message);
});
//Make app listen on port 7000
var port = 7000; // en el puerto que vamos a escuchar
app.listen(port, function () {
    console.log('Listening on http://localhost:' + port);
});
module.exports = app;

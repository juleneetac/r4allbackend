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
const https = require("https"),
  fs = require("fs");

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
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(function () {
    console.log('Mongodb connection OK\n');
}).catch(function (err) {
    console.log("Database error: " + err.message);
});
const options = {
    key: fs.readFileSync("../ser.key"),
    cert: fs.readFileSync("../ser.pem")
    
  };
//Make app listen on port 7000
//const port = 7000; // en el puerto que vamos a escuchar
//const server = app.listen(port, function () {
//    console.log('Listening on http://localhost:' + port);
//});
//const server =http.createServer(app).listen(80);
console.log(options);

const server = https.createServer(options, app).listen(7000);



//SOCKETS
//server del chat
//Socket setup for conexion of every client

//Let us define a hashMap being the key the username and the values its socketId
let listaUsuarios: Map<string, string> = new Map();

var socket = require('socket.io');
const io = socket(server);
//Event listener when a socket is connected
//Conection for every client
io.on('connection', (socket) => {
    
    console.log('user connected socket 1' + socket);
    let username2: string;
   
    socket.on('set-username', (username) => {
      socket.username = username;
      console.log('user connected socket' + socket.username);
      username2 = username;     //puede que haya que quitar esta funcion porque no es una sala
      console.log(socket.username);
      io.emit('users-changed', {user: username, event: 'joined'});    
      listaUsuarios.set(username, socket.id);
    });
    
   

    //Private message user-to-user if both are online, otherwise store it
    socket.on('message', function (data) {
        console.log(data.mensaje + " by " + username2 + " to " + data.destination);
        let message = data.mensaje;
        if (listaUsuarios.get(data.destination)) {
            io.to(<string>listaUsuarios.get(data.destination)).emit('message', {message, username2});
        } 
        else {
            console.log("error en el chat");
            
        }
    });

    socket.on('giveMeUserList', function () {
        console.log("antesemit")
        socket.emit('listaUsuarios', Array.from(listaUsuarios));
        console.log("despuesemit")
    });

    //On a disconnection, delete its socketId from the hashMap
    socket.on('disconnect', function() {
        console.log("desconexion tactica de socket: "+ username2)
        console.log(username2 + ' disconnected');
        listaUsuarios.delete(username2);
        io.emit('listaUsuarios', Array.from(username2));
    });
  });

  // socket.on('disconnect', function(){
    //   io.emit('users-changed', {user: socket.username, event: 'left'});   
    // });

  // socket.on('add-message', (message) => {
    //   io.emit('message', {text: message.text, from: message.from, created: new Date()});    
    // });


module.exports = app;



// io.on('connection', (socket) => {
//     console.log('user connected socket');

//     socket.on('new-message', (message) => {
//         io.emit(message);
//       });
// });




// io.on('connection', (socket) => {
  
//     socket.on('disconnect', function(){
//       io.emit('users-changed', {user: socket.username, event: 'left'});   
//     });
   
//     socket.on('set-username', (username) => {
//       socket.username = username;
//       io.emit('users-changed', {user: username, event: 'joined'});    
//     });
    
//     socket.on('add-message', (message) => {
//       io.emit('message', {text: message.text, from: socket.username, created: new Date()});    
//     });
//   });




//io.on('connection', onConnection);

//function onConnection(socket) {

    // io.on('connection',function(socket){
    //     console.log('Conexion con el Socket: ', socket.id)
    //     socket.on('nusername', function(username){
    //         socket.username = username;
        
    //     });
      
          
    //   socket.on('connected', function(){
    //       var allConnectedClients = io.sockets.connected; //list os socket connected
    //       var send = []
    //       Object.keys(allConnectedClients).forEach(function(key){
    //           var val = allConnectedClients[key]["username"] + " " + allConnectedClients[key]["id"] ;
    //           send.push(val);
    //       });
    
    //       io.sockets.emit('usersconnected',send);//send to connected socket
    //       console.log("Enviando lista de usuarios al front: "+send);
    
    //   });
      
    
      
    //   socket.on('disconnect', function(){
    //       console.log('Usuario desconectado: '+socket.username);
    //           var allConnectedClients = io.sockets.connected; //list os socket connected
    //           var send = []
    //           Object.keys(allConnectedClients).forEach(function(key){
    //               var val = allConnectedClients[key]["username"] + " " + allConnectedClients[key]["id"] ;
    //               send.push(val);
    //           });
      
    //           io.sockets.emit('user',send);//send to connected socket
    //   });
    //   socket.on('chat',function(username, message, destino){//send messages
    //       io.sockets.emit('chat',username, message, destino);
    //       console.log("Recibiendo y reenviando" + message + destino);
    //   });
    // });


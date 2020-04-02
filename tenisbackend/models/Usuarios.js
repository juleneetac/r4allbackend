'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var usuarios = new Schema({
    username: String,
    password: String,
    sexo: String,
    rutaimagen: String,
    ubicacion: String,
    edad: Number,
    exp: String,
    valoracion: Number,
    partidas: [{ type: mongoose.Types.ObjectId, ref: 'partidas' }],
    torneos: [{ type: mongoose.Types.ObjectId, ref: 'torneos' }],
    chats: [{ type: mongoose.Types.ObjectId, ref: 'chats' }],
    amigos: [{ type: mongoose.Types.ObjectId, ref: 'usuarios' }] //referencia con la colección de usuarios
    // phones: [{
    //         home: String,
    //         work: String
    //     }],
    // studies: [String]
});
module.exports = mongoose.model('usuarios', usuarios); //la coleccion se llamara usuarios

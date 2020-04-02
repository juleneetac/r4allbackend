'use strict';

import mongoose = require("mongoose");
let Schema = mongoose.Schema;
let usuarios = new Schema({
    username: String,
    password: String,
    sexo: String,
    rutaimagen: String,
    ubicacion: String,
    edad: Number,
    exp: String,
    valoracion: Number,
    partidas: [{ type: mongoose.Types.ObjectId, ref: 'partidas' }], //referencia con la colección de partidas
    torneos: [{ type: mongoose.Types.ObjectId, ref: 'torneos' }], //referencia con la colección de torneos
    chats: [{ type: mongoose.Types.ObjectId, ref: 'chats' }], //referencia con la colección de chats
    amigos: [{ type: mongoose.Types.ObjectId, ref: 'usuarios' }] //referencia con la colección de usuarios
    // phones: [{
    //         home: String,
    //         work: String
    //     }],
    // studies: [String]
});
module.exports = mongoose.model('usuarios', usuarios); //la coleccion se llamara usuarios

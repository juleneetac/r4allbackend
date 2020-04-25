'use strict';
import {model, Document} from 'mongoose';

import mongoose = require("mongoose");
let Schema = mongoose.Schema;
let usuarios = new Schema({
    username: String,
    mail: String,     //cambiar las funciones de register o login para usar con el mail
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


interface Iusuarios extends Document {
    username:string,
    mail:string,
    password:string,
    sexo:string,
    rutaimagen:string,
    ubicacion: string,
    edad: number,
    exp: string,
    valoracion: number,
    partidas: [{ type: mongoose.Types.ObjectId, ref: 'partidas' }],
    torneos: [{ type: mongoose.Types.ObjectId, ref: 'torneos' }], 
    chats: [{ type: mongoose.Types.ObjectId, ref: 'chats' }],
    amigos: [{ type: mongoose.Types.ObjectId, ref: 'usuarios' }]
}

export default model <Iusuarios>('usuarios',usuarios);

module.exports = mongoose.model('usuarios', usuarios); //la coleccion se llamara usuarios


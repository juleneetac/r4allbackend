'use strict';

//import bcrypt from "bcrypt";
import {Schema, model} from 'mongoose';
import crypto = require('crypto');
//import crypto from 'crypto';
import jwt =  require ('jsonwebtoken');
import mongoose = require("mongoose");
import Point from './Point';

let UsuariosSchema = mongoose.Schema;
let usuarios = new UsuariosSchema({
    username: String,
    mail: String,     //cambiar las funciones de register o login para usar con el mail
    password: String,
    sexo: String,
    rutaimagen: String,
    ubicacion: String,
    //localizacion: Point,
    edad: Number,
    exp: Number,
    valoracion: Number,
    partidas: [{ type: mongoose.Types.ObjectId, ref: 'partidas' }], //referencia con la colección de partidas
    torneos: [{ type: mongoose.Types.ObjectId, ref: 'torneos' }], //referencia con la colección de torneos
    chats: [{ type: mongoose.Types.ObjectId, ref: 'chats' }], //referencia con la colección de chats
    amigos: [{ type: mongoose.Types.ObjectId, ref: 'usuarios' }], //referencia con la colección de usuarios
    hash: { type: String },
    salt: { type: String }
});


usuarios.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

usuarios.methods.validatePassword = function(password) {
    console.log(this.salt);
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

usuarios.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    const minutes = 60;
    expirationDate.setTime(today.getTime() + minutes*60000);
    return jwt.sign({
        username: this.username,
        _id: this._id,
        exp: expirationDate.getTime() / 1000,
    }, 'secret');
};

usuarios.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        username: this.username,
        mail: this.mail
    };
};

//export default model('usuarios', usuarios);
module.exports = mongoose.model('usuarios', usuarios); //la coleccion se llamara usuarios

'use strict';

import mongoose = require("mongoose");
let Schema = mongoose.Schema;
let mensajes = new Schema({
    author: String,
    destination: String, //quien envia el mensaje
    mensaje: String,
    date: String
});
module.exports = mongoose.model('mensajes', mensajes);
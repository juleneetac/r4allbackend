'use strict';

import mongoose = require("mongoose");
let Schema = mongoose.Schema;
let mensajes = new Schema({
    mensaje: String,
    sender: String, //quien envia el mensaje
    fecha: Date
});
module.exports = mongoose.model('mensajes', mensajes);
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var mensajes = new Schema({
    mensaje: String,
    sender: { type: mongoose.Types.ObjectId, ref: 'usuarios' },
    fecha: Date
});
module.exports = mongoose.model('mensajes', mensajes);

'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var partidas = new Schema({
    deporte: String,
    di: String,
    ubicacion: String,
    ganador: String,
    organizador: { type: mongoose.Types.ObjectId, ref: 'usuarios' },
    invitados: [{ type: mongoose.Types.ObjectId, ref: 'usuarios' }]
});
module.exports = mongoose.model('partidas', partidas); //la coleccion se llamara partidas

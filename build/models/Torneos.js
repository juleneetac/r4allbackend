'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var torneos = new Schema({
    deporte: String,
    di: String,
    ubicacion: String,
    ganador: { type: mongoose.Types.ObjectId, ref: 'usuarios' },
    organizador: { type: mongoose.Types.ObjectId, ref: 'usuarios' },
    puntos: Number,
    participantes: [{ type: mongoose.Types.ObjectId, ref: 'participantes' }]
});
module.exports = mongoose.model('torneos', torneos); //la coleccion se llamara torneos

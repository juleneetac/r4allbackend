'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var participantes = new Schema({
    _id: { type: mongoose.Types.ObjectId, ref: 'usuarios' },
    puntos: Number,
    victorias: Number,
    derrotas: Number
});
module.exports = mongoose.model('participantes', participantes); //la coleccion se llamara participantes

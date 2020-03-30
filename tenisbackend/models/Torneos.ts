'use strict';

import mongoose = require("mongoose");
let Schema = mongoose.Schema;
let torneos = new Schema({
    deporte: String,
    di: String,   // soble o individual
    ubicacion: String,
    ganador: String,
    organizador: { type: mongoose.Types.ObjectId, ref: 'usuarios' },
    puntos: Number,   //ni idea, creo que mejor borrarla
    participantes: [{ type: mongoose.Types.ObjectId, ref: 'participantes' }]
});
module.exports = mongoose.model('torneos', torneos);  //la coleccion se llamara torneos

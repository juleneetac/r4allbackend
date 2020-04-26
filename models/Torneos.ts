'use strict';

import mongoose = require("mongoose");
let Schema = mongoose.Schema;
let torneos = new Schema({
    //deporte: String,
    modo: String,           //Individuales o Dobles
    pistacubierta: Boolean, //Cubierta o no
    tipopista: String,      //Césped, TierraBatida, etc.
    ubicacion: String,
    ganador: { type: mongoose.Types.ObjectId, ref: 'usuarios' },
    organizador: { type: mongoose.Types.ObjectId, ref: 'usuarios' },
    puntos: Number,   //ni idea, creo que mejor borrarla
    participantes: [{ type: mongoose.Types.ObjectId, ref: 'participantes' }]
});
module.exports = mongoose.model('torneos', torneos);  //la coleccion se llamara torneos

'use strict';

import mongoose = require("mongoose");
let Schema = mongoose.Schema;
let participantes = new Schema({  //hace referencia a los participantes de un torneo
    _idUsuario: { type: mongoose.Types.ObjectId, ref: 'usuarios' },  // va atener que ser la misma id que la del user
    _idTorneo: { type: mongoose.Types.ObjectId, ref: 'torneos' },   //Torneo en el cual es Participante
    puntos: Number,
    victorias: Number,
    derrotas: Number
});
module.exports = mongoose.model('participantes', participantes);  //la coleccion se llamara participantes

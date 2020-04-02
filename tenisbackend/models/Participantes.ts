'use strict';

import mongoose = require("mongoose");
let Schema = mongoose.Schema;
let participantes = new Schema({  //hace referencia a los participantes de un torneo
    _id: { type: mongoose.Types.ObjectId, ref: 'usuarios' },  // va atener que ser la misma id que la del user
    puntos: Number,
    victorias: Number,
    derrotas: Number
});
module.exports = mongoose.model('participantes', participantes);  //la coleccion se llamara participantes

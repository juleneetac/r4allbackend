'use strict';

import mongoose = require("mongoose");
let Schema = mongoose.Schema;
let partidas = new Schema({
    deporte: String,
    di: String,  //doble o individual
    ubicacion: String,
    ganador: String,
    organizador: { type: mongoose.Types.ObjectId, ref: 'usuarios' },
    invitados: [{ type: mongoose.Types.ObjectId, ref: 'usuarios' }]
});
module.exports = mongoose.model('partidas', partidas); //la coleccion se llamara partidas

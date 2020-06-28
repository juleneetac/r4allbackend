'use strict';

import mongoose = require("mongoose");
let ParticipantesSchema = mongoose.Schema;
let participantes = new ParticipantesSchema({  //hace referencia a los participantes de un torneo
    _idUsuario: { type: mongoose.Types.ObjectId, ref: 'usuarios' }, 
    //_id: String,                                                        //id del Usuario que participa en el Torneo
    _idTorneo: { type: mongoose.Types.ObjectId, ref: 'torneos' },       //Torneo en el cual es Participante
    pareja: { type: mongoose.Types.ObjectId, ref: 'participantes' },    //Si no tiene pareja es null, y no saldría en el Mongo ya que es NOSQL
    nombre: String,                                                     //El username del Usuario
    puntos: Number,
    ranking: Number,
    victorias: Number,
    derrotas: Number
});
module.exports = mongoose.model('participantes', participantes);  //la coleccion se llamara participantes

'use strict';

import mongoose = require("mongoose");
let Schema = mongoose.Schema;
let torneos = new Schema({
    nombre: String,         //Nombre del Torneo
    modo: String,           //Individuales o Dobles
    genero: String,         //m o f
    pistacubierta: Boolean, //Cubierta o no
    tipopista: String,      //Hierba, TierraBatida, etc.
    tipobola: String,       //Introducido por el Organizador
    ubicacion: String,      //Nombre de la ubicación (Por ejemplo, Real Club de Tenis)
    punto: {            //Punto de la ubicación
        type: { type: String },           //"Point"
        coordinates: { type: [Number] }   //[latitud,longitud]
    },
    ganador: { type: mongoose.Types.ObjectId, ref: 'usuarios' },    //Si es null no saldría en el Mongo e indicaría que el Torneo está activo
    inscripcion: Number,    //Precio de inscripcion
    premio: String,         
    organizador: String,    //Por ejemplo, Club de Tenis, Federacion, Usuario...
    participantes: [{ type: mongoose.Types.ObjectId, ref: 'participantes' }]
});

torneos.index({punto: "2dsphere"});    //Para poder buscar según ubicación

module.exports = mongoose.model('torneos', torneos);  //la coleccion se llamara torneos

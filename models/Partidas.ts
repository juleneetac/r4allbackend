'use strict';

import mongoose = require("mongoose");
let Schema = mongoose.Schema;
let partidas = new Schema({
    modo: String,       //(d)oble o (i)ndividual
    ubicacion: String,  //Nombre de la ubicación (Por ejemplo, Real Club de Tenis)
    punto: {            //Punto de la ubicación
        type: { type: String },           //"Point"
        coordinates: { type: [Number] }   //[latitud,longitud]
    },
    ganador: String,
    organizador: String,
    invitado: [String],
});

partidas.index({punto: "2dsphere"});    //Para poder buscar según ubicación

module.exports = mongoose.model('partidas', partidas); //la coleccion se llamara partidas

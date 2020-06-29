'use strict';

import mongoose = require("mongoose");
let Schema = mongoose.Schema;
let partidas = new Schema({
    modo: String,       //(d)oble o (i)ndividual
    ubicacion: String,  //Nombre de la ubicación (Por ejemplo, Real Club de Tenis)
    punto: {            //Punto de la ubicación
        type: { 
            type: String, 
            default: "Point" 
        },           
        coordinates: { 
            type: [Number] //[longitud,latitud]
        }
    },
    ganador: String,    //Si es null no saldría en el Mongo e indicaría que el Torneo está activo 
    organizador: String,
    invitados: [String]
});

partidas.index({punto: "2dsphere"});    //Para poder buscar según ubicación

module.exports = mongoose.model('partidas', partidas); //la coleccion se llamara partidas

'use strict';
export{};

let UsuariosSchema = require('../models/Usuarios');
let TorneosSchema = require('../models/Torneos');
let PartidasSchema = require('../models/Partidas');
let ParticipantesSchema = require('../models/Participantes');
let MensajesSchema = require('../models/Mensajes');
let ChatsSchema = require('../models/Chats');
let mongoose = require('mongoose');


exports.addPartida = async function (req, res){  //añadir una partida
    let partida = req.body.partida;
    let newPartida = new PartidasSchema (partida);
    try {
        await newPartida.save();
        res.status(200).send({message: "Partida creado"})
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
};

exports.getPartidas = async function (req, res){   //me da el todas las partidas
    let partida = await PartidasSchema.find();
    console.log(partida);
    if(partida) {
        res.status(200).json(partida);
    } else {
        res.status(424).send({message: 'partida error'});
    }
}
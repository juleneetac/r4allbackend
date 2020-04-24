'use strict';
export{};

let UsuariosSchema = require('../models/Usuarios');
let TorneosSchema = require('../models/Torneos');
let PartidasSchema = require('../models/Partidas');
let ParticipantesSchema = require('../models/Participantes');
let MensajesSchema = require('../models/Mensajes');
let ChatsSchema = require('../models/Chats');
let mongoose = require('mongoose');

exports.addTorneo = async function (req, res){  //añadir un torneo
    let torneo = req.body.torneo;
    let newTorneo = new TorneosSchema (torneo);
    try {
        await newTorneo.save();
        res.status(200).send({message: "Torneo creado"})
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
};

exports.getTorneo = async function (req, res){ //me da datos de un torneo especifico
    let my_id = req.params.torneoId;
    let torneo = await UsuariosSchema.findById(my_id);
    if(torneo) {
        res.status(200).json(torneo);
    } else {
        res.status(424).send({message: 'Torneo not found'});
    }
};

exports.getTorneos = async function (req, res){   //me da el nombre de todos los torneos
    let torneo = await TorneosSchema.find();
    console.log(torneo);
    if(torneo) {
        res.status(200).json(torneo);
    } else {
        res.status(424).send({message: 'torneo error'});
    }
};

exports.getParticipantesde  = async function(req, res){ //me da los participantes de un torneo
    let my_id = req.params.torneoId;  //el req.params crea un parametro
    // req.params es para get
    let partic = await TorneosSchema.findById(my_id).populate('participantes'); 
    //le paso el id de un usuario como parametro y me devuelve todas las partidas que ha jugado
    console.log(partic);
    if(partic) {
        res.status(200).json(partic);
    } else {
        res.status(424).send({message: 'Error buscando partidas'});
    }
};
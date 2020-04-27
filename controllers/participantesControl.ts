'use strict';
export{};

let UsuariosSchema = require('../models/Usuarios');
let TorneosSchema = require('../models/Torneos');
let PartidasSchema = require('../models/Partidas');
let ParticipantesSchema = require('../models/Participantes');
let MensajesSchema = require('../models/Mensajes');
let ChatsSchema = require('../models/Chats');
let mongoose = require('mongoose');


exports.addParticipante = async function (req, res){  //añadir un participante
                                                 // el id se lo ponemos nosotros asi que no se como se hara
    let participante = req.body.participante;
    let newParticipante = new ParticipantesSchema (participante);
    try {
        await newParticipante.save();
        res.status(200).send({message: "Participante añadido"})
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
};
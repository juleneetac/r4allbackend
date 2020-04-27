'use strict';
export{};

let UsuariosSchema = require('../models/Usuarios');
let TorneosSchema = require('../models/Torneos');
let PartidasSchema = require('../models/Partidas');
let ParticipantesSchema = require('../models/Participantes');
let MensajesSchema = require('../models/Mensajes');
let ChatsSchema = require('../models/Chats');
let mongoose = require('mongoose');


exports.addMensaje = async function (req, res){  //crear un nuevo mensaje
    let mensaje = req.body.mensaje;
    let newMensaje = new MensajesSchema (mensaje);
    try {
        await newMensaje.save();
        res.status(200).send({message: "Mensaje nuevo"})
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
};
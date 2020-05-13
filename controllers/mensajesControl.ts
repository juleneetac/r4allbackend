'use strict';
export{};

let UsuariosSchema = require('../models/Usuarios');
let TorneosSchema = require('../models/Torneos');
let PartidasSchema = require('../models/Partidas');
let ParticipantesSchema = require('../models/Participantes');
let MensajesSchema = require('../models/Mensajes');
let ChatsSchema = require('../models/Chats');
let mongoose = require('mongoose');


exports.addMensaje = async function(req, res) {
    const author: string = req.body.author;
    const destination: string = req.body.destination;
    const mensaje: string = req.body.mensaje;
    const date: Date = new Date();

    const msg = new MensajesSchema({author, destination, mensaje, date});
    await msg.save().then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
        console.log(err);
    })
};

exports.getMensajes = async function(req, res) {
    let userUsername: string = req.params.userUsername;
    let messages = await MensajesSchema.find({$or: [{'author': userUsername}, {'destination': userUsername}]});
    //lo de arriba le llega una id y lo que hará es buscar si esta da igual que sea del autor o del destinatario
    if (messages) {
        return res.status(200).json(messages);
    } else {
        return res.status(404).send('Not Found');
    }
};
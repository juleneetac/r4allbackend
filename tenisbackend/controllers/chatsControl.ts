'use strict';
export{};

let UsuariosSchema = require('../models/Usuarios');
let TorneosSchema = require('../models/Torneos');
let PartidasSchema = require('../models/Partidas');
let ParticipantesSchema = require('../models/Participantes');
let MensajesSchema = require('../models/Mensajes');
let ChatsSchema = require('../models/Chats');
let mongoose = require('mongoose');


exports.addChat = async function (req, res){  //crear un nuevo chat
    let chat = req.body.chat;
    let newChat = new ChatsSchema (chat);
    try {
        await newChat.save();
        res.status(200).send({message: "Chat nuevo"})
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
};
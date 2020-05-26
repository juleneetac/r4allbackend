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
    let partida = req.body;
    
    try {
        
        let newPartida = new PartidasSchema (partida); 
       
        await newPartida.save();
        console.log("partida :"+newPartida)
        let id = newPartida._id
        console.log(id);
        let organizador= await UsuariosSchema.findOneAndUpdate({username:req.body.organizador},{$push:{partidas: id}},{new: true})//busca url que coincida
        console.log("organizador: "+ organizador)
        let invitados= await UsuariosSchema.findOneAndUpdate({username :req.body.invitado},{$push:{partidas: id}},{new: true})
        console.log("invitados: " + invitados)
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
exports.updatePartida = async function (req,res){
    try{
        console.log (req.body)
        let _id= req.params.id
        console.log(_id)
        const partidaModificada = await PartidasSchema.findByIdAndUpdate({ _id: _id },  req.body, {new: true});
        console.log(partidaModificada);
        res.status(201).json(partidaModificada);
    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
    }
};

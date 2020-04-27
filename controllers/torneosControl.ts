'use strict';
export{};

let UsuariosSchema = require('../models/Usuarios');
let TorneosSchema = require('../models/Torneos');
let PartidasSchema = require('../models/Partidas');
let ParticipantesSchema = require('../models/Participantes');
let MensajesSchema = require('../models/Mensajes');
let ChatsSchema = require('../models/Chats');
let mongoose = require('mongoose');

exports.getTorneo = async function (req, res){ //me da datos de un torneo especifico
    let my_id = req.params.torneoId;
    let torneo = await UsuariosSchema.findById(my_id);
    if(torneo) {
        res.status(200).json(torneo);
    } else {
        res.status(424).send({message: 'Torneo not found'});
    }
};

exports.getTorneos = async function (req, res){
    //Buscar lista general o por filtros en el JSON
    try{
        let { flags, ubicacion, radio, pistacubierta, tipopista, modo, organizador, participantes } = req.body;

        //case flags = [true,true,true,3]
        let torneos = await TorneosSchema.find({
            //--------- BUSCAR POR UBICACIÓN Y RADIO: QUEDA PENDIENTE ------------//
            "pistacubierta": pistacubierta,
            "tipopista": tipopista,
            "modo": modo,
            "organizador": organizador,
            //"participantesLength": {$gte: participantes[0], $lte: participantes[1]}
        });

        //------------------------------------ BUSCAR SEGÚN LOS FLAGS: QUEDA PENDIENTE ---------------------------------------//

        if(torneos)
            res.status(200).json(torneos);
        else 
            res.status(404).json("No se han encontrado Usuarios con los parámetros seleccionados");
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
};

exports.addTorneo = async function (req, res){
    try{
        //------------- COMPROBAR AUTORIDAD: Queda Pendiente -------------------//
        let newTorneo = new TorneosSchema();
        newTorneo.pistacubierta = req.body.pistacubierta;
        newTorneo.tipopista = req.body.tipopista;
        newTorneo.modo = req.body.modo;
        newTorneo.ubicacion = req.body.ubicacion;
        newTorneo.organizador = req.body.organizador;

        await newTorneo.save();
        res.status(200).send("Torneo creado")
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
};

exports.addParticipante = async function(req,res){
    try{
        let usuarioId = req.body.usuarioId;
        let torneoId = req.body.torneoId;
        let checkUsuario = await UsuariosSchema.findById(usuarioId);
        if(checkUsuario){
            let checkTorneo = await TorneosSchema.findById(torneoId);
            if(checkTorneo){
                await TorneosSchema.updateOne( {'_id': torneoId}, {$addToSet:{'participantes': usuarioId}}).then((data) => {
                    if(data.nModified == 1){
                        //Añadir Participante 
                        let newParticipante = new ParticipantesSchema();
                        newParticipante._idUsuario = usuarioId;
                        newParticipante._idTorneo = torneoId;
                        newParticipante.puntos = 0;
                        newParticipante.victorias = 0;
                        newParticipante.derrotas = 0;

                        newParticipante.save();
                        
                        //Añadir Torneo a la lista de Torneos del Usuario
/*                         await UsuariosSchema.updateOne( {'_id': usuarioId}, {$addToSet:{'torneos': torneoId}}).then((data) => {
                            if(data.nModified == 1){
                                res.status(201).json("Participante añadido");
                            }
                            else
                                res.status(409).json("El Usuario ya es Participante del Torneo");
                        }) */
                    }
                    else
                        res.status(409).json("El Usuario ya es Participante del Torneo")
                })
            }
            else
                res.status(404).json("Torneo no encontrado");
        }
        else
            res.status(404).json("Usuario no encontrado");
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
}

exports.getParticipantesde  = async function(req, res){
    //Devuelve los Participantes de un Torneo
    let torneoId = req.params.torneoId;
    let partic = await TorneosSchema.findById(torneoId).populate('participantes'); 
    //le paso el id de un usuario como parametro y me devuelve todas las partidas que ha jugado
    console.log(partic);
    if(partic) {
        res.status(200).json(partic);
    } else {
        res.status(424).send({message: 'Error buscando partidas'});
    }
};

exports.editTorneo = async function(req,res){
    try{
        /*let torneoid = req.body._id;
        let checktorneo = await TorneosSchema.findById(torneoid);
        if(checktorneo){
            await TorneosSchema.UpdateOne( {'_id':torneoid}, );
            res.status(201).json("Torneo actualizado correctamente");
        } 
        else{
            res.status(404).json("Torneo no encontrado");
        }*/
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
}

exports.deleteTorneo = async function(req,res){
    try{
        //Eliminar Torneo y Eliminar Participantes
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
}
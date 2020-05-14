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
        let { flags } = req.body;        
        
        //---Para agregar dinamicamente propiedades en un objeto---//
        interface LooseObject {
            [key: string]: any
        }
        let query:LooseObject = {};

        if(flags[0]){
            let { punto, radio } = req.body;
            Object.assign(query, {'punto':        
            { $near:
                {
                  $geometry: { type: punto.type,  coordinates: [ punto.coordinates[0] , punto.coordinates[1] ] },
                  $maxDistance: radio
                }
             }
            })
        }
        if(flags[1]){
            let { pistacubierta } = req.body;
            Object.assign(query, {'pistacubierta': pistacubierta});
        }
        if(flags[2]){
            let { tipopista } = req.body;
            Object.assign(query, {'tipopista': {'$regex' : `^${tipopista}$`, '$options' : 'i'}});
        }
        if(flags[3]){
            let { modo } = req.body;
            Object.assign(query, {'modo': {'$regex' : `^${modo}$`, '$options' : 'i'}});
        }
        let participantesFlag: number = flags[4];
        if(participantesFlag != 0){
            let { participantes } = req.body;
            if (participantesFlag == 1){
                Object.assign(query, { $where: `this.participantes.length >= ${participantes[0]}`} );
            }
            else if (participantesFlag== 2){
                Object.assign(query, { $where: `this.participantes.length <= ${participantes[1]}`} );
            }
            else if (participantesFlag == 3){
                Object.assign(query, { $where: `this.participantes.length >= ${participantes[0]} && this.participantes.length <= ${participantes[1]}`} );
            }
        }

        console.log(query);

        let torneos = await TorneosSchema.find(query);
        res.status(200).json(torneos);

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
        newTorneo.nombre = req.body.nombre;
        newTorneo.genero = req.body.genero;
        newTorneo.pistacubierta = req.body.pistacubierta;
        newTorneo.tipopista = req.body.tipopista;
        newTorneo.tipobola = req.body.tipobola;
        newTorneo.modo = req.body.modo;
        newTorneo.ubicacion = req.body.ubicacion;
        newTorneo.punto = req.body.punto;
        newTorneo.organizador = req.body.organizador;
        newTorneo.inscripcion = req.body.inscripcion;
        newTorneo.premio = req.body.premio;

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
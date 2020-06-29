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
            if(radio < 100000) { //Si llega al límite se buscan también los que lo superen
                Object.assign(query, {'punto': { 
                    $near: {
                      $geometry: { type: punto.type,  coordinates: [ punto.coordinates[0] , punto.coordinates[1] ] },
                      $maxDistance: radio
                    }
                }
                });
            }
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
            let { tipobola } = req.body;
            Object.assign(query, {'tipobola': { "$regex": tipobola, "$options": "i" }});
        }
        if(flags[4]){
            let { modo } = req.body;
            Object.assign(query, {'modo': {'$regex' : `^${modo}$`, '$options' : 'i'}});
        }
        if(flags[5]){
            let { genero } = req.body;
            Object.assign(query, {'genero': {'$regex' : `^${genero}$`, '$options' : 'i'}});
        }
        if(flags[6]){
            let { organizador } = req.body;
            Object.assign(query, {'organizador': { "$regex": organizador, "$options": "i" }});
        }
        if(flags[7]){
            let { inscripcion } = req.body;
            if(inscripcion[1] == 1000){ //Si llega al límite se buscan también los que lo superen
                Object.assign(query, {'inscripcion': {$gte: inscripcion[0]}});
            }
            else{
                Object.assign(query, {'inscripcion': {$gte: inscripcion[0], $lte: inscripcion[1]}});
            }
        }
        if(flags[8]){
            let { capacidad } = req.body;
            if(capacidad[1] == 200){ //Si llega al límite se buscan también los que lo superen
                Object.assign(query, {'capacidad': {$gte: capacidad[0]}});
            }
            else{
                Object.assign(query, {'capacidad': {$gte: capacidad[0], $lte: capacidad[1]}});
            }
        }

        console.log(query);

        let torneos = await TorneosSchema.find(query);

        for (let i = 0; i < torneos.length; i++) {
            //Obtener el/los ganadores 
            if(torneos[i].ganador !== undefined){
                if(torneos.modo == 'i'){
                    torneos[i] = await TorneosSchema.findById(torneos[i]._id).populate('ganador');
                }
                else{
                    torneos[i] = await TorneosSchema.findById(torneos[i]._id).populate('ganador').populate('ganador2');
                }
            }
        }
        
        res.status(200).json(torneos);

    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
};

exports.getAllTorneos = async function (req, res){
    //Devuelve todos los torneos
    try{
        let alltorneos = await TorneosSchema.find();

        for (let i = 0; i < alltorneos.length; i++) {
            //Obtener el/los ganadores 
            if(alltorneos[i].ganador !== undefined){
                if(alltorneos.modo == 'i'){
                    alltorneos[i] = await TorneosSchema.findById(alltorneos[i]._id).populate('ganador');
                }
                else{
                    alltorneos[i] = await TorneosSchema.findById(alltorneos[i]._id).populate('ganador').populate('ganador2');
                }
            }
        }

        if(alltorneos) {
            res.status(200).json(alltorneos);
        } else {
            res.status(404).send({message: 'Error buscando Torneos'});
        }
    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
    }
};

exports.getParticipante = async function(req,res){
    //Devuelve el Participante de un Usuario que participa en un Torneo
    let participante = await ParticipantesSchema.find({'_idUsuario': req.body._idUsuario, '_idTorneo': req.body._idTorneo});
    console.log(participante);
    if(participante) {
        res.status(200).json(participante);
    } else {
        res.status(404).send('Participante no encontrado');
    }

}

exports.getParticipantesde  = async function(req, res){
    //Devuelve los Torneos con los Participantes populados, y dentro de ellos, las parejas populadas

    let torneo = await TorneosSchema.findById(req.params.torneoId);
    let participantes;

    if(torneo.modo == 'd'){
        participantes = await TorneosSchema.findById(req.params.torneoId)
        .populate({
            path: 'participantes',
            model: 'participantes',
            populate: {
                path: 'pareja',
                model: 'participantes'
            }
        }); 
        //.populate('participantes').populate('participantes.pareja');
    }
    else
        participantes = await TorneosSchema.findById(req.params.torneoId).populate('participantes');

    console.log(participantes);

    if(participantes) {
        res.status(200).json(participantes);
    } else {
        res.status(404).send({message: 'Error buscando participantes'});
    }
};

exports.getGanadores = async function(req, res){ //me da los torneos de un jugador
    try{
        let torneo = await TorneosSchema.findById(req.params.torneoID);
        let ganadores = [];
    
        //Obtener el/los ganadores 
        if(torneo){
            if(torneo.ganador !== undefined){
                if(torneo.modo == 'i'){
                   let torneoganador = await TorneosSchema.findById(req.params.torneoID).populate('ganador');
                   ganadores.push(torneoganador.ganador);
                }
                else{
                    let torneoganador = await TorneosSchema.findById(req.params.torneoID).populate('ganador').populate('ganador2');
                    ganadores.push(torneoganador.ganador);
                    ganadores.push(torneoganador.ganador2);
                }
            }
            else{
                res.status(404).json('El Torneo aún no ha acabado');
            }
        } 
        if(torneo) {
            res.status(200).json(ganadores);
        } else {
            res.status(404).json('Error buscando torneos');
        }
    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
    }
};

exports.addTorneo = async function (req, res){
    try{
        //------------- COMPROBAR AUTORIDAD: Queda Pendiente -------------------//
        let newTorneo = new TorneosSchema();
        newTorneo.nombre = req.body.nombre;
        newTorneo.descripcion = req.body.descripcion;
        newTorneo.sitioweb = req.body.sitioweb;
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
        newTorneo.capacidad = req.body.capacidad;

        await newTorneo.save();
        res.status(200).send(newTorneo);
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
};

exports.updateTorneo = async function(req,res){
    try{
        //------------- COMPROBAR AUTORIDAD: Queda Pendiente -------------------//
        let torneoid = req.params.torneoId;
        let checktorneo = await TorneosSchema.findById(torneoid);
        if(checktorneo){
            let torneoEditado =  req.body;
            let torneoModificado = await TorneosSchema.findByIdAndUpdate( {'_id' : torneoid}, torneoEditado, {new: true});
            console.log(torneoModificado);
            res.status(201).json(torneoModificado);
        } 
        else{
            res.status(404).json({message: "Torneo no encontrado"});
        }
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
}

exports.addParticipante = async function(req,res){
    try{
        let checkUsuario = await UsuariosSchema.findById(req.body._idUsuario);
        if(checkUsuario){
            let checkTorneo = await TorneosSchema.findById(req.body._idTorneo);
            if(checkTorneo){
                if(checkTorneo.participantes.length < checkTorneo.capacidad){

                    //Añadir Torneo a la lista de Torneos del Usuario
                    await UsuariosSchema.updateOne( {'_id': req.body._idUsuario}, {$addToSet:{'torneos': req.body._idTorneo}}).then(async (data) => {
                        if(data.nModified == 1){

                            //Añadir Participante 
                            let newParticipante = new ParticipantesSchema();
                            newParticipante._idUsuario = req.body._idUsuario;
                            newParticipante._idTorneo = req.body._idTorneo;
                            newParticipante.nombre = req.body.nombre;

                            if(checkTorneo.modo == 'd'){
                                newParticipante.pareja = req.body.pareja;
                            }

                            newParticipante.ranking = checkTorneo.participantes.length + 1;
                            newParticipante.puntos = 0;
                            newParticipante.victorias = 0;
                            newParticipante.derrotas = 0;
    
                            await newParticipante.save();

                            console.log(newParticipante);

                            let addedParticipante = await ParticipantesSchema.findOne({'_idUsuario': newParticipante._idUsuario, '_idTorneo': newParticipante._idTorneo});

                            console.log(addedParticipante);

                            //Añadir Participante a la lista de Participantes del Torneo
                            await TorneosSchema.updateOne( {'_id': req.body._idTorneo}, {$addToSet:{'participantes': addedParticipante._id }}).then(async (data) => {
                                if(data.nModified == 1){
                                    res.status(201).json(addedParticipante);
                                }
                                else{
                                    res.status(409).json(`${addedParticipante.nombre} ya está en el Torneo`);
                                }
                            });
                        }
                        else{
                            res.status(409).json(`El Usuario ${req.body.nombre} ya participa en el Torneo`);
                        }
                    });
                }
                else{
                    res.status(507).json("El Torneo está lleno");
                }
            }
            else{
                res.status(404).json("Torneo no encontrado");
            }
        }
        else{
            res.status(404).json("Usuario no encontrado");
        }
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
}

exports.addParticipantes = async function(req,res){
    try{
        let participante1 = req.body.participante1;
        let participante2 = req.body.participante2;

        let checkUsuario1 = await UsuariosSchema.findById(participante1._idUsuario);
        let checkUsuario2 = await UsuariosSchema.findById(participante2._idUsuario);
        if(checkUsuario1 && checkUsuario2){
            let checkTorneo = await TorneosSchema.findById(participante1._idTorneo);
            if(checkTorneo){
                if(checkTorneo.participantes.length < checkTorneo.capacidad){

                    //Añadir Torneo a la lista de Torneos del Usuario1
                    await UsuariosSchema.updateOne( {'_id': participante1._idUsuario}, {$addToSet:{'torneos': participante1._idTorneo}}).then(async (data) => {
                        if(data.nModified == 1){

                            //Añadir Torneo a la lista de Torneos del Usuario1
                            await UsuariosSchema.updateOne( {'_id': participante2._idUsuario}, {$addToSet:{'torneos': participante2._idTorneo}}).then(async (data) => {
                                if(data.nModified == 1){

                                    //Añadir Participante1
                                    let newParticipante1 = new ParticipantesSchema();
                                    newParticipante1._idUsuario = participante1._idUsuario;
                                    newParticipante1._idTorneo = participante1._idTorneo;
                                    newParticipante1.nombre = participante1.nombre;
                                    newParticipante1.ranking = ((checkTorneo.participantes.length + 2)/2);
                                    newParticipante1.puntos = 0;
                                    newParticipante1.victorias = 0;
                                    newParticipante1.derrotas = 0;
                                    await newParticipante1.save();

                                    //Añadir Participante2
                                    let newParticipante2 = new ParticipantesSchema();
                                    newParticipante2._idUsuario = participante2._idUsuario;
                                    newParticipante2._idTorneo = participante2._idTorneo;
                                    newParticipante2.nombre = participante2.nombre;
                                    newParticipante2.ranking = ((checkTorneo.participantes.length + 2)/2);
                                    newParticipante2.puntos = 0;
                                    newParticipante2.victorias = 0;
                                    newParticipante2.derrotas = 0;
                                    await newParticipante2.save();

                                    let addedParticipante1 = await ParticipantesSchema.findOne({'_idUsuario': newParticipante1._idUsuario, '_idTorneo': newParticipante1._idTorneo});
                                    let addedParticipante2 = await ParticipantesSchema.findOne({'_idUsuario': newParticipante2._idUsuario, '_idTorneo': newParticipante2._idTorneo});

                                    await ParticipantesSchema.updateOne({'_idUsuario': newParticipante1._idUsuario, '_idTorneo': newParticipante1._idTorneo}, {$addToSet:{'pareja': addedParticipante2._id}});
                                    await ParticipantesSchema.updateOne({'_idUsuario': newParticipante2._idUsuario, '_idTorneo': newParticipante2._idTorneo}, {$addToSet:{'pareja': addedParticipante1._id}});

                                    //Añadir Participante1 a la lista de Participantes del Torneo
                                    await TorneosSchema.updateOne( {'_id': addedParticipante1._idTorneo}, {$addToSet:{'participantes': addedParticipante1._id }}).then(async (data) => {
                                        if(data.nModified == 1){

                                            //Añadir Participante2 a la lista de Participantes del Torneo
                                            await TorneosSchema.updateOne( {'_id': addedParticipante2._idTorneo}, {$addToSet:{'participantes': addedParticipante2._id }}).then(async (data) => {
                                                if(data.nModified == 1){
                                                    let participantes = {
                                                        'participante1': addedParticipante1,
                                                        'participante2': addedParticipante2
                                                      };
                                                    res.status(201).json(participantes);
                                                }
                                                else{
                                                    res.status(409).json(`${addedParticipante1.nombre} ya está en el Torneo`);
                                                }
                                            });
                                        }
                                        else{
                                            res.status(409).json(`${addedParticipante2.nombre} ya está en el Torneo`);
                                        }
                                    });
                                }
                                else{
                                    res.status(409).json(`El Usuario ${participante2.nombre} ya participa en el Torneo`);
                                }
                            });
                        }
                        else{
                            res.status(409).json(`El Usuario ${participante1.nombre} ya participa en el Torneo`);
                        }
                    });
                }
                else{
                    res.status(507).json("El Torneo está lleno");
                }
            }
            else{
                res.status(404).json("Torneo no encontrado");
            }
        }
        else{
            res.status(404).json("Usuarios no encontrados");
        }
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
}

exports.addGanador = async function(req,res){
    try{
        //------------- COMPROBAR AUTORIDAD: Queda Pendiente -------------------//
        let torneoid = req.params.torneoId;
        let checktorneo = await TorneosSchema.findById(torneoid);
        if(checktorneo){
            checktorneo.ganador = req.body._id;
            let torneoModificado = await TorneosSchema.findByIdAndUpdate( {'_id' : torneoid}, checktorneo, {new: true});
            console.log(torneoModificado);
            res.status(201).json({"message": `Ganador del Torneo ${torneoid} es ${checktorneo.ganador}`});
        } 
        else{
            res.status(404).json({message: "Torneo no encontrado"});
        }
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
}

exports.addGanadores = async function(req,res){
    try{
        //------------- COMPROBAR AUTORIDAD: Queda Pendiente -------------------//
        let torneoid = req.params.torneoId;
        let checktorneo = await TorneosSchema.findById(torneoid);
        if(checktorneo){
            checktorneo.ganador = req.body._idParticipante1;
            checktorneo.ganador2 = req.body._idParticipante2;
            let torneoModificado = await TorneosSchema.findByIdAndUpdate( {'_id' : torneoid}, checktorneo, {new: true});
            console.log(torneoModificado);
            res.status(201).json({"message": `Ganadores del Torneo ${torneoid} son ${checktorneo.ganador} y ${checktorneo.ganador2}`});
        } 
        else{
            res.status(404).json({message: "Torneo no encontrado"});
        }
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
}

exports.deleteTorneo = async function(req,res){
    try{
        //Eliminar Torneo
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
}
'use strict';
export{};


let UsuariosSchema = require('../models/Usuarios');
let TorneosSchema = require('../models/Torneos');
let PartidasSchema = require('../models/Partidas');
let ParticipantesSchema = require('../models/Participantes');
let MensajesSchema = require('../models/Mensajes');
let ChatsSchema = require('../models/Chats');
let mongoose = require('mongoose');

exports.registrar = async function (req, res){  //registrarse un usuario si el usuario ya existe da error
    let usuario = req.body;
    console.log("username "+usuario.username)
    console.log("Mail "+ usuario.mail)
    console.log("password "+usuario.password)
    console.log("edad "+usuario.edad)
    console.log("sexo "+usuario.sexo)
    console.log("ubicacion "+usuario.ubicacion)
    let user = new UsuariosSchema()
    console.log(user)
    let foundUsername = await UsuariosSchema.findOne({username:usuario.username});
    let foundMail = await UsuariosSchema.findOne({mail:usuario.mail});

    if(foundUsername) {
        return res.status(409).json({message: "Nombre de usuario ya registrado. Pon otro nombre"});
    }

   // else if(foundMail) {
        //return res.status(410).json({message: "Mail ya registrado. Pon otra cuenta de mail "});
    //}

    else{
        try{
            user.username = usuario.username
            user.mail = usuario.mail
            user.password = usuario.password
            user.edad = usuario.edad
            user.sexo = usuario.sexo
            user.ubicacion = usuario.ubicacion
            user.exp = 0
            user.valoracion = 0
            await user.save();
            return res.status(201).send(user);
        } 
        catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }
}

exports.login = async function (req, res){ //logearse un usuario si la contraseña no coincide da error
    let usuario = req.body;
    try {
        console.log("username body: " +usuario.username)
        console.log("contraseña body :" +usuario.password)
        let loggeduser = await UsuariosSchema.findOne({ username: usuario.username })   
        console.log("Se intenta logear el usuario "+usuario.username) //el que escribo ahora no el que ya tengo en la db

        if (!loggeduser) {
          return res.status(404).send({message: 'Usuario no encontrado'})

        } else if (loggeduser.username.length === 0 ) {
          return res.status(401).send({message: 'Inserta en el campo username'})
        }  
        if(loggeduser.password === usuario.password){ //la primera contraseña es como se llama en la db y la segunda la del json
          res.status(200).send(loggeduser);
        }
        else {
          res.status(402).send({message: 'Incorrect password'})
        }
      }catch (err) {
       res.status(500).send(err)
       console.log(err);
      }
    }

exports.getUsuario = async function (req, res){ //me da datos de un user especifico
    try{
        let my_id = req.params.usuarioId;
        let user = await UsuariosSchema.findById(my_id);
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).send({message: 'User not found'});
        }
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
};

exports.getUsuarios = async function (req, res){
    try{
        //Buscar lista general o por filtros en el JSON
        let { flags, ubicacion, radio, sexo, edad, exp, valoracion } = req.body;        
        
        
        //case flags = [true,true,3,3,3]
        let usuarios = await UsuariosSchema.find({
            //--------- BUSCAR POR UBICACIÓN Y RADIO: QUEDA PENDIENTE ------------//
            "sexo": sexo,
            "edad": {$gte: edad[0], $lte: edad[1]},
            "exp": {$gte: exp[0], $lte: exp[1]},
            "valoracion": {$gte: valoracion[0], $lte: valoracion[1]}
        });

        //------------------------------------ BUSCAR SEGÚN LOS FLAGS: QUEDA PENDIENTE ---------------------------------------//
        /*switch(flags[0]){
            case true: //--------- BUSCAR POR UBICACIÓN Y RADIO: QUEDA PENDIENTE ------------//
            case false: usuarios = await usuarios.find();
        }
        switch(flags[1]){
            case true: usuarios = await usuarios.find({'sexo': req.body.sexo});
            case false: usuarios = await usuarios.find();
        }
        switch(flags[2]){
            case 0: usuarios = await usuarios.find();
            case 1: usuarios = await usuarios.find({'edad': {$lt: req.body.edad.max}});
            case 2: usuarios = await usuarios.find({'edad': {$gt: req.body.edad.min}});
            case 3: usuarios = await usuarios.find({'edad': {$lt: req.body.edad.max, $gt: req.body.edad.min}});
        }
        switch(flags[2]){
            case 0: usuarios = await usuarios.find();
            case 1: usuarios = await usuarios.find({'edad': {$lt: req.body.exp.max}});
            case 2: usuarios = await usuarios.find({'edad': {$gt: req.body.exp.min}});
            case 3: usuarios = await usuarios.find({'edad': {$lt: req.body.exp.max, $gt: req.body.exp.min}});
        }
        switch(flags[3]){
            case 0: usuarios = await usuarios.find();
            case 1: usuarios = await usuarios.find({'edad': {$lt: req.body.valoracion.max}});
            case 2: usuarios = await usuarios.find({'edad': {$gt: req.body.valoracion.min}});
            case 3: usuarios = await usuarios.find({'edad': {$lt: req.body.valoracion.max, $gt: req.body.valoracion.min}});
        } */
        
        if(usuarios)
            res.status(200).json(usuarios);
        else 
            res.status(404).json("No se han encontrado Usuarios con los parámetros seleccionados");
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
}

exports.getPartidasde  = async function(req, res){
    let my_id = req.params.usuarioId;  //el req.params crea un parametro
    // req.params es para get
    let partida = await UsuariosSchema.findById(my_id).populate('partidas', '_id'); 
    //le paso el id de un usuario como parametro y me devuelve todas las partidas que ha jugado
    console.log(partida);
    if(partida) {
        res.status(200).json(partida);
    } else {
        res.status(404).send({message: 'Error buscando partidas'});
    }
};

exports.getTorneosde  = async function(req, res){ //me da los torneos de un jugador
    let my_id = req.params.usuarioId;  //el req.params crea un parametro 
    // req.params es para get
    let torneo = await UsuariosSchema.findById(my_id).populate('torneos', '_id'); 
    console.log(torneo);
    if(torneo) {
        res.status(200).json(torneo);
    } else {
        res.status(404).send({message: 'Error buscando torneos'});
    }
};

exports.getChatsde  = async function(req, res){  //me da los chats de un jugador
    let my_id = req.params.usuarioId;  //el req.params crea un parametro
    // req.params es para get
    let chat = await UsuariosSchema.findById(my_id).populate('chats', '_id'); 
    console.log(chat);
    if(chat) {
        res.status(200).json(chat);
    } else {
        res.status(404).send({message: 'Error de chat'});
    }
};

exports.getAmigosde  = async function(req, res){ //me da los amigos de un jugador
    let my_id = req.params.usuarioId;  //el req.params crea un parametro
    // req.params es para get
    let amigo = await UsuariosSchema.findById(my_id).populate('amigos', 'username'); // me da su nombre
    console.log(amigo);
    if(amigo) {
        res.status(200).json(amigo);
    } 
    else {
        res.status(404).send({message: 'Error al ver tus amigos'});
    }
};

exports.deleteUsuario = async function (req, res) { //borro el usuario que le paso con id
    try{
        let my_id = req.params.usuarioId;
        let user = await UsuariosSchema.findByIdAndRemove(my_id);
        if(!user){
            return res.status(404).send({message: 'user not found'})
        }else{
            res.status(200).send({message:'User deleted successfully'})
        }
    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
    }
};
'use strict';
export{};


import Perfil from '../models/Profile';

let UsuariosSchema = require('../models/Usuarios');
let TorneosSchema = require('../models/Torneos');
let PartidasSchema = require('../models/Partidas');
let ParticipantesSchema = require('../models/Participantes');
let MensajesSchema = require('../models/Mensajes');
let ChatsSchema = require('../models/Chats');
let mongoose = require('mongoose');
let avatar = '../uploads/user.png';
import {Request, Response} from 'express';


exports.registrar = async function (req, res){  //registrarse un usuario si el usuario ya existe da error
    const usuario = req.body;
    const rutaimagen = 'uploads\\c12139b9-196e-4ee3-beb5-ce0438932898.png';
    console.log("username "+usuario.username)
    console.log("Mail "+ usuario.mail)
    console.log("password "+usuario.password)
    console.log("edad "+usuario.edad)
    console.log("sexo "+usuario.sexo)
    console.log("rutaimagen"+rutaimagen)
    console.log("ubicacion "+usuario.ubicacion)
    const user = new UsuariosSchema()
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
            user.rutaimagen = rutaimagen
            user.ubicacion = usuario.ubicacion
            await user.save();
            return res.status(201).send({message: "Usuario created successfully"}) 
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
        let username = await UsuariosSchema.findOne({ username: usuario.username })   
        console.log("Se intenta logear el usuario "+usuario.username) //el que escribo ahora no el que ya tengo en la db

        if (!username) {
          return res.status(404).send({message: 'Usuario no encontrado'})

        } else if (username.length === 0 ) {
          return res.status(401).send({message: 'Inserta en el campo username'})
        }  
        if(username.password === usuario.password){ //la primera contraseña es como se llama en la db y la segunda la del json
          res.status(200).send({message: "Usuario logeado correctamente"})
        }
        else {
          res.status(402).send({message: 'Incorrect password'})
        }
      }catch (err) {
       res.status(500).send(err)
      }
    }

exports.getUsuario = async function (req, res){ //me da datos de un user especifico
    let my_id = req.params.usuarioId;
    let user = await UsuariosSchema.findById(my_id);
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(424).send({message: 'User not found'});
    }
};

exports.getUsuarios = async function (req, res){   //me da el nombre de todas los usuarios
    let user = await UsuariosSchema.find().select('username');
    console.log(user);
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(424).send({message: 'user error'});
    }
};

exports.getPartidasde  = async function(req, res){
    let my_id = req.params.usuarioId;  //el req.params crea un parametro
    // req.params es para get
    let partida = await UsuariosSchema.findById(my_id).populate('partidas', '_id'); 
    //le paso el id de un usuario como parametro y me devuelve todas las partidas que ha jugado
    console.log(partida);
    if(partida) {
        res.status(200).json(partida);
    } else {
        res.status(424).send({message: 'Error buscando partidas'});
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
        res.status(424).send({message: 'Error buscando torneos'});
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
        res.status(424).send({message: 'Error de chat'});
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
        res.status(424).send({message: 'Error al ver tus amigos'});
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
    }
};


export async function updatePerfil(req:Request, res:Response): Promise<Response>{

    const {id} = req.params;
    console.log(id);
    const {username,mail,password, sexo, ubicacion, edad, exp, valoracion, 
        partidas, torneos, chats, amigos} = req.body;
    const rutaimagen = req.file.path;
    console.log(rutaimagen);
    console.log(req.body);
    const update = await UsuariosSchema.findByIdAndUpdate(id,{
        username,
        mail,
        password,
        sexo,
        rutaimagen,
        ubicacion,
        edad,
        exp,
        valoracion,
        partidas,
        torneos,
        chats,
        amigos
    }, {new: true});

    return res.json({
        message: 'Success',
        update
    })
}



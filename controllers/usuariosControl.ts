'use strict';
export{};
import passport = require('passport');
import {Request, Response, json, NextFunction} from 'express';
const nodemailer = require("nodemailer");

let UsuariosSchema = require('../models/Usuarios');
let TorneosSchema = require('../models/Torneos');
let PartidasSchema = require('../models/Partidas');
let ParticipantesSchema = require('../models/Participantes');
let MensajesSchema = require('../models/Mensajes');
let ChatsSchema = require('../models/Chats');
let mongoose = require('mongoose');

//
import Perfil from '../models/Profile';
let avatar = '../uploads/user.png';

exports.registrar = async function (req, res){  //registrarse un usuario si el usuario ya existe da error
    let usuario = req.body;
        console.log("username "+usuario.username)
        console.log("Mail "+ usuario.mail)
        console.log("password "+usuario.password)
        console.log("edad "+usuario.edad)
        console.log("sexo "+usuario.sexo)
        console.log("ubicacion "+usuario.ubicacion)
        
        let foundUsername = await UsuariosSchema.findOne({username: usuario.username});
        let foundMail = await UsuariosSchema.findOne({mail: usuario.mail});
    
        if(foundUsername) {
            return res.status(409).json({message: "Nombre de usuario ya registrado. Pon otro nombre"});
        }
    
        else if(foundMail) {
            return res.status(410).json({message: "Mail ya registrado. Pon otra cuenta de mail "});
        }
    
        else{
            let newuser = new UsuariosSchema()
            try{
                newuser.username = usuario.username
                newuser.mail = usuario.mail
                newuser.password =  newuser.setPassword(usuario.password)
                newuser.edad = usuario.edad
                newuser.sexo = usuario.sexo
                newuser.ubicacion = usuario.ubicacion
                //sendMail(newuser.mail, newuser.username);
                return newuser.save()
                .then(() => res.status(200).json({
                    jwt: newuser.generateJWT(),  //genera un json web token
                    usuario: newuser.toAuthJSON()
                }));
                } 
            catch (err) {
                res.status(500).send(err);
                console.log(err);
                }
            }
        }

 exports.login = async function (req:Request,res:Response, next: NextFunction){ //logearse un usuario si la contraseña no coincide da error
            let usuario = req.body;
    //try {
        console.log("username body: " +usuario.username)
        console.log("contraseña body :" +usuario.password)
        let finduser = await UsuariosSchema.findOne({ username: usuario.username })   
        console.log("Se intenta logear el usuario "+ usuario.username) //el que escribo ahora no el que ya tengo en la db

        if (!finduser) {
          return res.status(404).send({message: 'Usuario no encontrado'})
        } 
        else if (finduser.length === 0 ) {
          return res.status(401).send({message: 'Inserta en el campo username'})
        }  

        else if(finduser.validatePassword(usuario.password)){ //la primera contraseña es como se llama en la db y la segunda la del json
            console.log("llega? ");
            let jwt = finduser.generateJWT();
            return res.status(200).json({jwt: jwt, usuario: finduser}); //lo que se pone en el json
        }
        else {
          res.status(402).send({message: 'Incorrect password'})
        }
     // }
      //catch (err) {
      // res.status(503).send(err)
      //}
        }
//-----PROVISIONAL HASTA QUE GUARDEMOS EL USUARIO EN EL LOCAL STORAGE DEL FRONTEND-----//
exports.getidofuser = async function (req,res){
    const username = req.params.username;
    const usuario = await UsuariosSchema.findOne({username: username})
    console.log(usuario);
    if (username){
    res.status(200).json(usuario._id);
    }

    else {
    res.status(404).send({message: 'Not Found'});
    }
};

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
    //Buscar lista general o por filtros en el JSON
    try{
        let { flags } = req.body;        
        
        //---Para agregar dinamicamente propiedades en un objeto---//
        interface LooseObject {
            [key: string]: any
        }
        let query:LooseObject = {};

        if(flags[0]){
            let { ubicacion, radio } = req.body;
            //--------- BUSCAR POR UBICACIÓN Y RADIO: QUEDA PENDIENTE ------------//
        }
        if(flags[1]){
            let { sexo } = req.body;
            Object.assign(query, {'sexo': sexo});
        }
        let edadFlag: number = flags[2];
        if(edadFlag != 0){
            let { edad } = req.body;
            if (edadFlag == 1){
                Object.assign(query, {'edad': {$gte: edad[0]}});
            }
            else if (edadFlag == 2){
                Object.assign(query, {'edad': {$lte: edad[1]}});
            }
            else if (edadFlag == 3){
                Object.assign(query, {"edad":  {$gte: edad[0], $lte: edad[1]}});
            }
        }
        let expFlag: number = flags[3];
        if(expFlag != 0){
            let { exp } = req.body;
            if (expFlag == 1){
                Object.assign(query, {'exp': {$gte: exp[0]}});
            }
            else if (expFlag == 2){
                Object.assign(query, {'exp': {$lte: exp[1]}});
            }
            else if (expFlag == 3){
                Object.assign(query, {"exp":  {$gte: exp[0], $lte: exp[1]}});
            }
        }
        let valoracionFlag: number = flags[4];
        if(valoracionFlag != 0){
            let { valoracion } = req.body;
            if (valoracionFlag == 1){
                Object.assign(query, {'valoracion': {$gte: valoracion[0]}});
            }
            else if (valoracionFlag== 2){
                Object.assign(query, {'valoracion': {$lte: valoracion[1]}});
            }
            else if (valoracionFlag == 3){
                Object.assign(query, {"valoracion":  {$gte: valoracion[0], $lte: valoracion[1]}});
            }
        }

        console.log(query);

        let usuarios = await UsuariosSchema.find(query);
        
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

exports.getAllUsuarios = async function (req, res){ //me da datos de un user especifico
    let allusuarios = await UsuariosSchema.find().select('username');
    console.log(allusuarios);
    if(allusuarios) {
        res.status(200).json(allusuarios);
    } else {
        res.status(424).send({message: 'Usuarios error'});
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

exports.updateUsuario = async function (req,res){
    try{
        let difpass;
        let userpass = new UsuariosSchema()
        const id = req.params.usuarioId;
        console.log(id);
        let editusuario =  req.body;
        difpass = userpass.setPassword(editusuario.password)
        
        let newuser = {
        mail: editusuario.mail,
        hash: userpass.hash,
        salt: userpass.salt,
        edad: editusuario.edad,
        sexo: editusuario.sexo,
        ubicacion: editusuario.ubicacion,
        rutaimagen: req.file.path,

        }
       // const {mail, difpass, sexo, ubicacion, edad} = req.body;
        console.log("Usuario editado "+ req.body.mail)
       // let finduser = await UsuariosSchema.findOne({ username: usuario.username }) 
        //const rutaimagen = req.file.path;
        console.log(newuser.rutaimagen);
        console.log(req.body);
        const usuarioEditado = await UsuariosSchema.findByIdAndUpdate({ _id: id }, newuser, {new: true});
        console.log(usuarioEditado);
        res.status(201).json({usuarioEditado});
    }
    catch(err){
        //console.log("Usuario editado "+ req.body.username)
        res.status(500).send(err)
        console.log(err);
    }
};

exports.updateUsuarionofoto = async function (req,res){
    try{
        let difpass;
        let userpass = new UsuariosSchema()
        const id = req.params.usuarioId;
        console.log(id);
        let editusuario =  req.body;
        difpass = userpass.setPassword(editusuario.password)
        
        let newuser = {
        mail: editusuario.mail,
        hash: userpass.hash,
        salt: userpass.salt,
        edad: editusuario.edad,
        sexo: editusuario.sexo,
        ubicacion: editusuario.ubicacion,

        }
       // const {mail, difpass, sexo, ubicacion, edad} = req.body;
        console.log("Usuario editado "+ req.body.mail)
       // let finduser = await UsuariosSchema.findOne({ username: usuario.username }) 
        //const rutaimagen = req.file.path;
        console.log(req.body);
        const usuarioEditado = await UsuariosSchema.findByIdAndUpdate({ _id: id }, newuser, {new: true});
        console.log(usuarioEditado);
        res.status(201).json({usuarioEditado});
    }
    catch(err){
        //console.log("Usuario editado "+ req.body.username)
        res.status(500).send(err)
        console.log(err);
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

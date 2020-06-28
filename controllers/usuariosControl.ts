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
        console.log(usuario.punto)
        
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
                newuser.punto = usuario.punto
                newuser.exp = 0;
                newuser.valoracion = 0;
                newuser.rutaimagen = 'uploads\\default.png';
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
        console.log("username body: " + usuario.username)
        console.log("contraseña body :" + usuario.password)
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
//Get one user by username
exports.getUsuariobyusername = async (req, res) => {
    try {
      let user = await UsuariosSchema.findOne({username:req.params.username})
      console.log("encontrado: "+ user)
      if (!user) {
        return res.status(404).send({message: 'User not found'})
      } else {
        res.json(user)
      }
    }catch (err) {
      res.status(500).send(err)
    }
  }

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
            let { sexo } = req.body;
            Object.assign(query, {'sexo': {'$regex' : `^${sexo}$`, '$options' : 'i'}});
        }
        if(flags[2]){
            let { edad } = req.body;
            if(edad[1] == 100){ //Si llega al límite se buscan también los que lo superen
                Object.assign(query, {'edad': {$gte: edad[0]}});
            }
            else{
                Object.assign(query, {'edad': {$gte: edad[0], $lte: edad[1]}});
            }
        }
        if(flags[3]){
            let { exp } = req.body;
            if(exp[1] == 1000){ //Si llega al límite se buscan también los que lo superen
                Object.assign(query, {'exp': {$gte: exp[0]}});
            }
            else{
                Object.assign(query, {'exp': {$gte: exp[0], $lte: exp[1]}});
            }
        }
        if(flags[4]){
            let { valoracion } = req.body;
            if(valoracion[1] == 1000){ //Si llega al límite se buscan también los que lo superen
                Object.assign(query, {'exp': {$gte: valoracion[0]}});
            }
            else{
                Object.assign(query, {'exp': {$gte: valoracion[0], $lte: valoracion[1]}});
            }
        }

        console.log(query);

        let usuarios = await UsuariosSchema.find(query);
        res.status(200).json(usuarios);

    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
}

exports.getAllUsuarios = async function (req, res){
    //Devuelve todos los usuarios
    try{
        let allusuarios = await UsuariosSchema.find();
        if(allusuarios) {
            res.status(200).json(allusuarios);
        } else {
            res.status(424).send({message: 'Error buscando Usuarios'});
        }
    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
    }
};

exports.getPartidasde  = async function(req, res){
    let my_id = req.params.usuarioId;  //el req.params crea un parametro
    // req.params es para get
    let partida = await UsuariosSchema.findById(my_id).populate('partidas'); 
    //le paso el id de un usuario como parametro y me devuelve todas las partidas que ha jugado
    console.log(partida)
    if(partida) {
        res.status(200).json(partida);
    } else {
        res.status(404).send({message: 'Error buscando partidas'});
    }
};

exports.getTorneosde  = async function(req, res){ //me da los torneos de un jugador
    let torneo = await UsuariosSchema.findById(req.params.usuarioId).populate('torneos'); 
    if(torneo) {
        res.status(200).json(torneo);
    } else {
        res.status(404).json('Error buscando torneos');
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
        let id = req.params.usuarioId;
        let check = await UsuariosSchema.findById(id);
        if(check){
            let difpass;
            let userpass = new UsuariosSchema();
            let usuarioEditado =  req.body;
            difpass = userpass.setPassword(usuarioEditado.password)

/*             let newuser = {
                mail: editusuario.mail,
                hash: userpass.hash,
                salt: userpass.salt,
                edad: editusuario.edad,
                sexo: editusuario.sexo,
                ubicacion: editusuario.ubicacion,
                punto: editusuario.punto,
                rutaimagen: req.file.path
            } */

            console.log(usuarioEditado);

            const usuarioModificado = await UsuariosSchema.findByIdAndUpdate({ _id: id }, usuarioEditado, {new: true});

            console.log(usuarioModificado);
            res.status(201).json(usuarioModificado);
        }
        else{
            res.status(404).json({"message": "Usuario no encontrado"});
        }
        
    }
    catch(err){
        //console.log("Usuario editado "+ req.body.username)
        res.status(500).send(err)
        console.log(err);
    }
};

exports.updateImagenUsuario = async function (req,res){
    try{
        let id = req.params.usuarioId;
        //let difpass;
        //let userpass = new UsuariosSchema()
        let editusuario =  req.body;
        //difpass = userpass.setPassword(editusuario.password)
        
        let usuarioNuevaImagen = {
            rutaimagen: req.file.path
        }

        console.log(usuarioNuevaImagen)
        const usuarioEditado = await UsuariosSchema.findByIdAndUpdate({ _id: id }, usuarioNuevaImagen, {new: true});
        console.log(usuarioEditado);

        res.status(201).json(usuarioEditado);
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


//funciones para guardar datos de facebook en la DB
exports.registrarfacebook = async function (req, res){  //hay que hacerla todavia
    let usuario = req.body;
   
        console.log("username "+usuario.username)
        console.log("Mail "+ usuario.mail)
        console.log("edad "+usuario.edad)
        console.log("sexo "+usuario.sexo)
        console.log("ubicacion "+usuario.ubicacion)
        console.log(usuario.punto)
        
        //let foundUsername = await UsuariosSchema.findOne({username: usuario.username});
        let foundMail = await UsuariosSchema.findOne({mail: usuario.mail});
    
        // if(foundUsername) {
        //     return res.status(409).json({message: "Nombre de usuario ya registrado. Pon otro nombre"});
        // }
    
        if(foundMail) {
            return res.status(201).json({usuario: foundMail});
        }
    
        else{
            let newuser = new UsuariosSchema()
            
            
            try{
                
                console.log(newuser);
                newuser.username = usuario.username
                newuser.mail = usuario.mail
                newuser.edad = 0  //usuario.edad
                newuser.sexo = usuario.sexo
                newuser.ubicacion = ""//usuario.ubicacion
                newuser.punto = usuario.punto
                newuser.exp = 0;
                newuser.valoracion = 0;
                newuser.rutaimagen = 'uploads\\c12139b9-196e-4ee3-beb5-ce0438932898.png';
                //sendMail(newuser.mail, newuser.username);

                return newuser.save()

                .then(() => res.status(200).json({
                    usuario: newuser.toAuthJSON()
                }));
                } 
            catch (err) {
                res.status(500).send(err);
                console.log(err);
                }
      }
 }

 exports.updatefacebookUsuario = async function (req,res){  // mas o menos esta hecha
    try{
        let id = req.params.usuarioId;
        let check = await UsuariosSchema.findById(id);
        if(check){
            let usuariofacebookEditado =  req.body;

            console.log(usuariofacebookEditado);

            const usuarioModificado = await UsuariosSchema.findByIdAndUpdate({ _id: id }, usuariofacebookEditado, {new: true});

            console.log(usuarioModificado);
            res.status(201).json(usuarioModificado);
        }
        else{
            res.status(503).json({message: "Usuario no encontrado"});
        }
        
    }
    catch(err){
        //console.log("Usuario editado "+ req.body.username)
        res.status(501).send(err)
        console.log(err);
    }
};
        


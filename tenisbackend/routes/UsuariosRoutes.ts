"use strict";

import express = require("express");
let router = express.Router();
let usuariosControl = require('../controllers/usuariosControl');  //usuarios

//post
router.post('/register', usuariosControl.registrar);   // añade un usuario
router.post('/login', usuariosControl.login);   // logea un usuario

//get
router.get('/getusr/:usuarioId', usuariosControl.getUsuario); //me da un user en concreto con la id que le doy
router.get('/getusrs', usuariosControl.getUsuarios);   // me da todos los users
router.get('/getpartbyuser/:usuarioId', usuariosControl.getPartidasde); //me da los torneos de un user
router.get('/gettornbyuser/:usuarioId', usuariosControl.getTorneosde);  // me da las partidas de un user
router.get('/getchatbyuser/:usuarioId', usuariosControl.getChatsde); // me da los chats de un user
router.get('/getamigbyuser/:usuarioId', usuariosControl.getAmigosde); // me da los amigos de un user

//put

//delete
router.delete('/deleteuser/:usuarioId', usuariosControl.deleteUsuario);  // borra un usuario


module.exports = router;
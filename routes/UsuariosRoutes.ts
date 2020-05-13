"use strict";

import express = require("express");
import multer from '../libs/multer';

let router = express.Router();
let usuariosControl = require('../controllers/usuariosControl');  //usuarios


//POST
router.post('/register', usuariosControl.registrar);    // añade un usuario
router.post('/login', usuariosControl.login);           // logea un usuario
router.post('/getusrs', usuariosControl.getUsuarios);   //Devuelve la lista de Usuarios según los filtros del JSON

//GET
router.get('/getusr/:usuarioId', usuariosControl.getUsuario); //me da un user en concreto con la id que le doy
router.get('/getusrbyname/:username', usuariosControl.getUsuariobyusername); //me da un user en concreto con el username que le doy
router.get('/getallusrs', usuariosControl.getAllUsuarios);   // me da todos los users
router.get('/getpartbyuser/:usuarioId', usuariosControl.getPartidasde); //me da los torneos de un user
router.get('/gettornbyuser/:usuarioId', usuariosControl.getTorneosde);  // me da las partidas de un user
router.get('/getchatbyuser/:usuarioId', usuariosControl.getChatsde); // me da los chats de un user
router.get('/getamigbyuser/:usuarioId', usuariosControl.getAmigosde); // me da los amigos de un user

//PUT
router.put('/update/:usuarioId', multer.single('rutaimagen'), usuariosControl.updateUsuario);
router.put('/updatenofoto/:usuarioId', multer.single('rutaimagen'), usuariosControl.updateUsuarionofoto);

//DELETE
router.delete('/deleteuser/:usuarioId', usuariosControl.deleteUsuario);  // borra un usuario

module.exports = router;
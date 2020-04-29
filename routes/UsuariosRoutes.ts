"use strict";

import express = require("express");
let router = express.Router();
let usuariosControl = require('../controllers/usuariosControl');  //usuarios

//
import multer from '../libs/multer';
import {updatePerfil} from '../controllers/usuariosControl';
import {getpassofuser} from '../controllers/usuariosControl';
import {getavatar} from '../controllers/usuariosControl';
 
//POST
router.post('/register', usuariosControl.registrar);    // añade un usuario
router.post('/login', usuariosControl.login);           // logea un usuario
router.post('/getusrs', usuariosControl.getUsuarios);   //Devuelve la lista de Usuarios según los filtros del JSON

//GET
router.get('/getusr/:usuarioId', usuariosControl.getUsuario); //me da un user en concreto con la id que le doy
router.get('/getpartbyuser/:usuarioId', usuariosControl.getPartidasde); //me da los torneos de un user
router.get('/gettornbyuser/:usuarioId', usuariosControl.getTorneosde);  // me da las partidas de un user
router.get('/getchatbyuser/:usuarioId', usuariosControl.getChatsde); // me da los chats de un user
router.get('/getamigbyuser/:usuarioId', usuariosControl.getAmigosde); // me da los amigos de un user

//
router.get('/getidofuser/:username',usuariosControl.getidofuser);

router.route('/getpassofuser/:id')
    .get(getpassofuser);

 router.route('/avatar/:id')
    .get(getavatar); 

//PUT
router.route('/update/:id')
    .put(multer.single('rutaimagen'), updatePerfil);//router.route('/update/:usuarioId').put(multer.single('rutaimagen'), usuariosControl.updatePerfil);

//DELETE
router.delete('/deleteuser/:usuarioId', usuariosControl.deleteUsuario);  // borra un usuario


module.exports = router;
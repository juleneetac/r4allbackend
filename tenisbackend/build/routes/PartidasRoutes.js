"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var partidasControl = require('../controllers/partidasControl'); //usuarios
//post
router.post('/addprd', partidasControl.addPartida); //añade una partida
//get
router.get('/getprts', partidasControl.getPartidas); //me da todas las partidas
//put
//delete
module.exports = router;

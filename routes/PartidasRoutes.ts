"use strict";

import express = require("express");
let router = express.Router();
let partidasControl = require('../controllers/partidasControl');  //usuarios

//post
router.post('/addprd', partidasControl.addPartida); //añade una partida

//get
router.get('/getprts', partidasControl.getPartidas);  //me da todas las partidas

//put
router.put('/updprd/:id', partidasControl.updatePartida);  //me da todas las partidas
//delete
module.exports = router;
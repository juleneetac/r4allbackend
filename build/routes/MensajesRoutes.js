"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var mensajesControl = require('../controllers/mensajesControl'); //usuarios
//post
router.post('/addmsg', mensajesControl.addMensaje); //crea un mensaje
//get
//put
//delete
module.exports = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var participantesControl = require('../controllers/participantesControl'); //usuarios
//post
router.post('/addprantes', participantesControl.addParticipante); // añade un participante
//get
//put
//delete
module.exports = router;

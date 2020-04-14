"use strict";

import express = require("express");
let router = express.Router();
let participantesControl = require('../controllers/participantesControl');  //usuarios

//post
router.post('/addprantes', participantesControl.addParticipante);  // añade un participante

//get

//put

//delete

module.exports = router;
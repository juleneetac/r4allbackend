"use strict";

import express = require("express");
let router = express.Router();
let torneosControl = require('../controllers/torneosControl');  //torneos

// post
router.post('/addtrn', torneosControl.addTorneo);  // añade un torneo

//get
router.get('/gettrn/:torneoId', torneosControl.getTorneo);  //me da todos los datos de un torneo especifico
router.get('/gettrns', torneosControl.getTorneos);  // me da todos los torneos
router.get('/getparticbytrn', torneosControl.getParticipantesde);  //me da los participantes de un torneo

//put

//delete

module.exports = router;
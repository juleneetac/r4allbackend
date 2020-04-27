"use strict";

import express = require("express");
let router = express.Router();
let torneosControl = require('../controllers/torneosControl');  //torneos

//POST
router.post('/addtrn', torneosControl.addTorneo);   // añade un torneo
router.post('/gettrns', torneosControl.getTorneos); //Devuelve la lista de Torneos según los filtros del JSON
router.post('/addpartic', torneosControl.addParticipante)

//GET
router.get('/gettrn/:torneoId', torneosControl.getTorneo);  //me da todos los datos de un torneo especifico
router.get('/getparticbytrn', torneosControl.getParticipantesde);  //me da los participantes de un torneo

//PUT
router.put('/updatetrn', torneosControl.editTorneo);    //Editar o Actualizar un Torneo

//DELETE
router.delete('/deletetrn', torneosControl.deleteTorneo);   //Eliminar un Torneo

module.exports = router;
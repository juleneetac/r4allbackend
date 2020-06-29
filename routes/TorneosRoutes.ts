"use strict";

import express = require("express");
let router = express.Router();
let torneosControl = require('../controllers/torneosControl');  //torneos

//POST
router.post('/addtrn', torneosControl.addTorneo);   // añade un torneo
router.post('/gettrns', torneosControl.getTorneos); //Devuelve la lista de Torneos según los filtros del JSON
router.post('/addpartic', torneosControl.addParticipante)   //Añade un Participante al Torneo
router.post('/addpartics', torneosControl.addParticipantes) //Añade dos Participantes (Parejas mútuas) al Torneo (Dobles)

//GET
router.get('/gettrn/:torneoId', torneosControl.getTorneo);  //me da todos los datos de un torneo especifico
router.get('/getalltrns', torneosControl.getAllTorneos);   // me da todos los Torneos
router.get('/getpartic', torneosControl.getParticipante);  //Participante de un Usuario dentro de un Torneo   
router.get('/getparticbytrn/:torneoId', torneosControl.getParticipantesde);  //me da los participantes de un torneo
router.get('/getganadores/:torneoID', torneosControl.getGanadores);    //Devuelve los ganadores de un Torneo

//PUT
router.put('/update/:torneoId', torneosControl.updateTorneo);    //Editar o Actualizar un Torneo
router.put('/addganador/:torneoId', torneosControl.addGanador);  //Introducir el ganador del Torneo
router.put('/addganadores/:torneoId', torneosControl.addGanadores);  //Introducir los Participantes ganadores del Torneo

//DELETE
router.delete('/delete/:torneoId', torneosControl.deleteTorneo);   //Eliminar un Torneo

module.exports = router;
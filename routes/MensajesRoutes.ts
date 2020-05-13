"use strict";

import express = require("express");
let router = express.Router();
let mensajesControl = require('../controllers/mensajesControl');  //usuarios

//post
router.post('/addmsg', mensajesControl.addMensaje);   //crea un mensaje

//get
router.get('/getmsg/:userUsername', mensajesControl.getMensajes);

//put

//delete

module.exports = router;
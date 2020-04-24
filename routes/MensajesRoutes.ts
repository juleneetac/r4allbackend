"use strict";

import express = require("express");
let router = express.Router();
let mensajesControl = require('../controllers/mensajesControl');  //usuarios

//post
router.post('/addmsg', mensajesControl.addMensaje);   //crea un mensaje

//get

//put

//delete

module.exports = router;
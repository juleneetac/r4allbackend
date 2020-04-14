"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var chatsControl = require('../controllers/chatsControl'); //usuarios
//post
router.post('/addcht', chatsControl.addChat); //añade un chat
//get
//put
//delete
module.exports = router;

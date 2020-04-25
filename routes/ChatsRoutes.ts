"use strict";

import express = require("express");
let router = express.Router();
let chatsControl = require('../controllers/chatsControl');  //usuarios

//post
router.post('/addcht', chatsControl.addChat);   //añade un chat

//get

//put

//delete

module.exports = router;
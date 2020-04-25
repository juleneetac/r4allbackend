import express = require("express");
let router = express.Router();
let profileControl = require('../controllers/profileControl');  //usuarios
import multer from '../libs/multer';

import {updatePerfil, postPerfil} from '../controllers/profileControl';

router.route('/newprofile')
    .post(multer.single('image'), postPerfil);

router.route('/update/:id')
    .put(multer.single('image'), updatePerfil);

   
module.exports = router;
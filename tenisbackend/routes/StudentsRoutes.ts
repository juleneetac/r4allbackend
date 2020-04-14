"use strict";

import express = require("express");
let router = express.Router();
let studentsControl = require('../controllers/studentsControl');  //students

router.get('/getStudents/:studiesName', studentsControl.getStudentsOf);  //me da los estudiantes de la carrera que le paso
router.post('/addStudent', studentsControl.postStudent);   
//router.get('/getSis', studentsControl.getStudentsS);  //se pueden quitar
//router.get('/getTel', studentsControl.getStudentsT);  //se pueden quitar
//router.get('/getAer', studentsControl.getStudentsA);  //se pueden quitar


//router.get('/getTel', studentScripts.getAllStudents);
//router.post('/add', studentScripts.addStudent);
module.exports = router;

"use strict";

import express = require("express");
let router = express.Router();
let subjectsControl = require('../controllers/subjectsControl');  //subjects

router.get('/getSubjects', subjectsControl.getSubjects);   //listado de asignaturas, solo me da el nombre
router.get('/subjectDetail/:subjectId', subjectsControl.getStudentfrom); // ver detalle de una asignatura
router.post('/addStudentsubj', subjectsControl.putStudentinSubject); //añadir alumno a una asignatura
router.get('/getStudentdet/:studentId', subjectsControl.getStudentDetails);  ////ver detalle de un alumno dentro de una asignatura


module.exports = router;

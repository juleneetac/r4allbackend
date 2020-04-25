'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var UsuariosSchema = require('../models/Usuarios');
var TorneosSchema = require('../models/Torneos');
var PartidasSchema = require('../models/Partidas');
var ParticipantesSchema = require('../models/Participantes');
var MensajesSchema = require('../models/Mensajes');
var ChatsSchema = require('../models/Chats');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID; //para usar el id directamente
function getSubjects(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var subject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, SubjectsSchema.find().select('name')];
                case 1:
                    subject = _a.sent();
                    console.log(subject);
                    if (subject) {
                        res.status(200).json(subject);
                    }
                    else {
                        res.status(424).send({ message: 'Subjects error' });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getStudentfrom(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, subject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _id = req.params.subjectId;
                    return [4 /*yield*/, SubjectsSchema.findById(_id).populate('students', 'name')];
                case 1:
                    subject = _a.sent();
                    //la asignatura de la cual quiero buscar sus estudiantes, depende de el id que le pase como parametro
                    console.log(subject);
                    if (subject) {
                        res.status(200).json(subject);
                    }
                    else {
                        res.status(424).send({ message: 'Subjects error' });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function putStudentinSubject(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var subjectId, studentId, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subjectId = req.body.subject;
                    studentId = req.body.student;
                    console.log("subject: " + subjectId + ", studentID: " + studentId);
                    return [4 /*yield*/, SubjectsSchema.updateOne({ _id: subjectId }, { $addToSet: { students: studentId } })];
                case 1:
                    result = _a.sent();
                    console.log("subject: " + subjectId + ", studentID: " + studentId);
                    res.status(200).send(result);
                    res.status(200).send({ message: "Student added successfully to the station" });
                    return [2 /*return*/];
            }
        });
    });
}
function getStudentDetails(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, student, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.params.studentId;
                    return [4 /*yield*/, StudentsSchema.findById(_id)];
                case 1:
                    student = _a.sent();
                    if (!student) {
                        return [2 /*return*/, res.status(404).send({ message: 'student not found' })];
                    }
                    else {
                        res.status(200).send(student);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    res.status(500).send(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// async function getStudentEA (req, res){
//     let subject = await SubjectsSchema.findOne({name:'EA'}).populate('students', 'name'); 
//     //me da los estudiantes de la asignatura de EA con el nombre solo, si no pongo name me da toda la info del student
//     console.log(subject);
//     if(subject) {
//         res.status(200).json(subject);
//     } else {
//         res.status(424).send({message: 'Subjects error'});
//     }
// }
module.exports = { getSubjects: getSubjects, getStudentfrom: getStudentfrom, putStudentinSubject: putStudentinSubject, getStudentDetails: getStudentDetails };

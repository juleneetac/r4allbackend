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
exports.registrar = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var usuario, user, foundUsername, foundMail, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usuario = req.body;
                    console.log("username " + usuario.username);
                    console.log("username " + usuario.mail);
                    console.log("password " + usuario.password);
                    console.log("edad " + usuario.edad);
                    console.log("sexo " + usuario.sexo);
                    console.log("ubicacion " + usuario.ubicacion);
                    user = new UsuariosSchema();
                    console.log(user);
                    return [4 /*yield*/, UsuariosSchema.findOne({ username: usuario.username })];
                case 1:
                    foundUsername = _a.sent();
                    return [4 /*yield*/, UsuariosSchema.findOne({ mail: usuario.mail })];
                case 2:
                    foundMail = _a.sent();
                    if (foundUsername) {
                        return [2 /*return*/, res.status(409).json({ message: "Nombre de usuario ya registrado. Pon otro nombre" })];
                    }
                    if (!foundMail) return [3 /*break*/, 3];
                    return [2 /*return*/, res.status(410).json({ message: "Mail ya registrado. Pon otra cuenta de mail " })];
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    user.username = usuario.username;
                    user.mail = usuario.mail;
                    user.password = usuario.password;
                    user.edad = usuario.edad;
                    user.sexo = usuario.sexo;
                    user.ubicacion = usuario.ubicacion;
                    return [4 /*yield*/, user.save()];
                case 4:
                    _a.sent();
                    return [2 /*return*/, res.status(201).send({ message: "Usuario created successfully" })];
                case 5:
                    err_1 = _a.sent();
                    res.status(500).send(err_1);
                    console.log(err_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.login = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var usuario, username, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usuario = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log("username body: " + usuario.username);
                    console.log("contraseña body :" + usuario.password);
                    return [4 /*yield*/, UsuariosSchema.findOne({ username: usuario.username })];
                case 2:
                    username = _a.sent();
                    console.log("Se intenta logear el usuario " + usuario.username); //el que escribo ahora no el que ya tengo en la db
                    if (!username) {
                        return [2 /*return*/, res.status(404).send({ message: 'Usuario no encontrado' })];
                    }
                    else if (username.length === 0) {
                        return [2 /*return*/, res.status(401).send({ message: 'Inserta en el campo username' })];
                    }
                    if (username.password === usuario.password) { //la primera contraseña es como se llama en la db y la segunda la del json
                        res.status(200).send({ message: "Usuario logeado correctamente" });
                    }
                    else {
                        res.status(402).send({ message: 'Incorrect password' });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    res.status(500).send(err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getUsuario = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var my_id, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    my_id = req.params.usuarioId;
                    return [4 /*yield*/, UsuariosSchema.findById(my_id)];
                case 1:
                    user = _a.sent();
                    if (user) {
                        res.status(200).json(user);
                    }
                    else {
                        res.status(424).send({ message: 'User not found' });
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.getUsuarios = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UsuariosSchema.find().select('username')];
                case 1:
                    user = _a.sent();
                    console.log(user);
                    if (user) {
                        res.status(200).json(user);
                    }
                    else {
                        res.status(424).send({ message: 'user error' });
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.getPartidasde = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var my_id, partida;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    my_id = req.params.usuarioId;
                    return [4 /*yield*/, UsuariosSchema.findById(my_id).populate('partidas', '_id')];
                case 1:
                    partida = _a.sent();
                    //le paso el id de un usuario como parametro y me devuelve todas las partidas que ha jugado
                    console.log(partida);
                    if (partida) {
                        res.status(200).json(partida);
                    }
                    else {
                        res.status(424).send({ message: 'Error buscando partidas' });
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.getTorneosde = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var my_id, torneo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    my_id = req.params.usuarioId;
                    return [4 /*yield*/, UsuariosSchema.findById(my_id).populate('torneos', '_id')];
                case 1:
                    torneo = _a.sent();
                    console.log(torneo);
                    if (torneo) {
                        res.status(200).json(torneo);
                    }
                    else {
                        res.status(424).send({ message: 'Error buscando torneos' });
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.getChatsde = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var my_id, chat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    my_id = req.params.usuarioId;
                    return [4 /*yield*/, UsuariosSchema.findById(my_id).populate('chats', '_id')];
                case 1:
                    chat = _a.sent();
                    console.log(chat);
                    if (chat) {
                        res.status(200).json(chat);
                    }
                    else {
                        res.status(424).send({ message: 'Error de chat' });
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.getAmigosde = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var my_id, amigo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    my_id = req.params.usuarioId;
                    return [4 /*yield*/, UsuariosSchema.findById(my_id).populate('amigos', 'username')];
                case 1:
                    amigo = _a.sent();
                    console.log(amigo);
                    if (amigo) {
                        res.status(200).json(amigo);
                    }
                    else {
                        res.status(424).send({ message: 'Error al ver tus amigos' });
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.deleteUsuario = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var my_id, user, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    my_id = req.params.usuarioId;
                    return [4 /*yield*/, UsuariosSchema.findByIdAndRemove(my_id)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(404).send({ message: 'user not found' })];
                    }
                    else {
                        res.status(200).send({ message: 'User deleted successfully' });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    res.status(500).send(err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};

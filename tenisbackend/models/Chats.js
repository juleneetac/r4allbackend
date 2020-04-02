'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var chats = new Schema({
    usuarios: { type: mongoose.Types.ObjectId, ref: 'usuarios' },
    mensajes: [{ type: mongoose.Types.ObjectId, ref: 'mensajes' }] //relacionala id de cada mensaje enviado
});
module.exports = mongoose.model('chats', chats);

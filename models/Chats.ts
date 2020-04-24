'use strict';

import mongoose = require("mongoose");
let Schema = mongoose.Schema;
let chats = new Schema({
    usuarios: { type: mongoose.Types.ObjectId, ref: 'usuarios' }, //los usuarios que hay en el chat
    mensajes: [{ type: mongoose.Types.ObjectId, ref: 'mensajes' }] //relacionala id de cada mensaje enviado
});
module.exports = mongoose.model('chats', chats);

'use strict';

import {Request, Response} from 'express';
import UsuariosSchema from '../models/Usuarios';
import Perfil from '../models/Profile';
import Iusuarios from '../models/Usuarios';

const schema = require ('../models/Profile');

export{};

let TorneosSchema = require('../models/Torneos');
let PartidasSchema = require('../models/Partidas');
let ParticipantesSchema = require('../models/Participantes');
let MensajesSchema = require('../models/Mensajes');
let ChatsSchema = require('../models/Chats');
let mongoose = require('mongoose');


export async function updatePerfil(req:Request, res:Response){

    const {id} = req.params;
    const {username, mail, password, sexo, rutaimagen, ubicacion, edad, exp} = req.body;

    const update = await UsuariosSchema

}


export async function postPerfil (req: Request, res: Response){
    const {username, mail, password, sexo, ubicacion, edad, exp, valoracion} = req.body;
    const newPerfil = {
        username: username,
        mail: mail,
        password: password,
        sexo:sexo,
        rutaimagen: req.file.path,
        ubicacion:ubicacion,
        edad:edad,
        exp:exp,
        valoracion: valoracion
    }
    const perfil = new Perfil (newPerfil);
    await perfil.save();
    return res.json({
        message: 'copia created',
        perfil
    })

}
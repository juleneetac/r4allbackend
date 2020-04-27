'use strict';

import {Request, Response} from 'express';

import Perfil from '../models/Profile';

const schema = require ('../models/Profile');

export{};

let TorneosSchema = require('../models/Torneos');
let PartidasSchema = require('../models/Partidas');
let ParticipantesSchema = require('../models/Participantes');
let MensajesSchema = require('../models/Mensajes');
let ChatsSchema = require('../models/Chats');
let mongoose = require('mongoose');


export async function updatePerfil(req:Request, res:Response): Promise<Response>{

    const {id} = req.params;
    const {username,mail,password, sexo, rutaimagen, ubicacion, edad, exp, valoracion, 
        partidas, torneos, chats, amigos} = req.body;
    console.log(req.body);
    const update = await Perfil.findByIdAndUpdate(id,{
        username,
        mail,
        password,
        sexo,
        rutaimagen,
        ubicacion,
        edad,
        exp,
        valoracion,
        partidas,
        torneos,
        chats,
        amigos
    });

    return res.json({
        message: 'Success',
        update
    })
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
import {Schema, model, Document} from 'mongoose';
import mongoose = require ('mongoose');


const schema = new Schema ({   //este perfil es de prueba del bernat

    username: String,
    mail: String,
    password: String,
    sexo: String,
    rutaimagen: String,
    ubicacion: String,
    edad: Number,
    exp: String,
    valoracion: Number,
    partidas: [{ type: mongoose.Types.ObjectId, ref: 'partidas' }], //referencia con la colección de partidas
    torneos: [{ type: mongoose.Types.ObjectId, ref: 'torneos' }], //referencia con la colección de torneos
    chats: [{ type: mongoose.Types.ObjectId, ref: 'chats' }], //referencia con la colección de chats
    amigos: [{ type: mongoose.Types.ObjectId, ref: 'usuarios' }]
});

interface Iperfil extends Document {
    username:string,
    mail:string,
    password:string,
    sexo:string,
    rutaimagen:string,
    ubicacion: string,
    edad: number,
    exp: string,
    valoracion: number
}

export default model <Iperfil>('perfil',schema);


import mongoose = require('mongoose');
import passport = require('passport');
//import LocalStrategy = require('passport-local').;

import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;



const Usuarios = mongoose.model('usuarios');

passport.use(new LocalStrategy({ 
    usernameField: "username" ,
    passwordField: "password",
}, 
    (username, password, done) => {
    UsuariosSchema.findOne({ username })
        .then((user) => {
            if(!user || !user.validatePassword(password)) {
                return done(null, false, { message: "Invalid username or password." });
            }
            return done(null, user);
        }).catch(done);
}));
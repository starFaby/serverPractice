"use strict"

var token = require("jwt-simple");
var moment = require("moment");
var claveSecreta = "MiClave#; kl";

//forma de exportar funciones 
exports.crearToken = (usuario) => {
    var cargarToken = {
        sub : usuario.id,
        nombre : usuario.usuario,
        now : moment().unix(),
        exp : moment().add(30, "minutes").unix()
    }
    return token.encode(cargarToken, claveSecreta);
}
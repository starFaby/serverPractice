"use strict"

var express = require("express");
var ControladorUsuarios = require("../controladores/usuarios.controlador.js");
var api = express.Router();

var authorization = require ("../token/aut");

api.post("/crear-usuario", ControladorUsuarios.crearUsuario);

api.get("/login/:usuario/:password",authorization.autenticar ,ControladorUsuarios.login);

api.delete("/elminiar-usuario/:id", ControladorUsuarios.deleteUser);

api.put("/actualizar-usuario/", ControladorUsuarios.actualizarUsuario);

module.exports = api;
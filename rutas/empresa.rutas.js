var express = require("express");
var ControladorEmpresa = require("../controladores/empresa.controlador.js");
var api = express.Router();

api.post('/empresa', ControladorEmpresa.crearEmpresa);


module.exports = api;
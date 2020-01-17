"use strict"
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var rutaUsuarios = require("./rutas/usuarios.rutas.js");
var rutaEmpresas = require("./rutas/empresa.rutas.js");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Allow", "GET, POST, PUT, DELETE");
    next();
  });

/*app.get("/curso", function(req, res){
    res.status(200).send({mensaje: "prueba de conxión ok"});
})*/
app.use("/server", rutaUsuarios);
app.use("/empresa", rutaEmpresas);
app.use("/repuestos", rutaEmpresas);
module.exports = app;

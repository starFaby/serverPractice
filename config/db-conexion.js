"use strict"

var pgp = require("pg-promise")();
var datosServer = require("./db-server");

class dbConexion {
    constructor() {}
    conecta() {
        var db = pgp("postgres://" + datosServer.userName + ":" + datosServer.password +
            "@" + datosServer.hostName + ":" + datosServer.port + "/" + datosServer.dbName);

            db.one('SELECT "emprId", "emprCodigo", "emprNombre", "emprCiudad", "emprDireccion", "emprTipo" FROM public.empresa;')
            .then(function (obtenerDato) {
                console.log("Conexión Exitosa ♥");
                console.log("Nombre:", obtenerDato.emprNombre);
            })
            .catch(function (error) {
                console.log("ERROR:", error);
            });
    }
    

    desconecta() {
        var db = "";
        return db;
    }

}

module.exports = dbConexion;
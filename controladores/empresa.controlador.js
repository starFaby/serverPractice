"use strict"

var cn = require("../config/db-conexion");
var db = new cn().conecta();
var modeloEmpresa = require("../modelos/empresa.model");

function crearEmpresa(req, res)  {
    console.log('body ', req.body);
    const emp = req.body;
    const empresa = new modeloEmpresa(emp.emprCodigo, emp.emprNombre, emp.emprCiudad, emp.emprDireccion, emp.emprTipo ).add();
    db.none('INSERT INTO empresa(emprCodigo, emprNombre, emprCiudad, emprDireccion, emprTipo) VALUES(${emprCodigo}, ${emprNombre}, ${emprCiudad}, {emprDireccion}, {emprTipo})', {
        id: 123,
        body: 'some text'    
    })
}

module.exports = {
    crearEmpresa
}
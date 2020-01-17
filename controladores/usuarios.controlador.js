"use strict"

var cn = require("../config/db-conexion");
var db = new cn().conecta();
var usr = require("../modelos/usuarios.modelo");
var bcrypt = require("bcrypt-nodejs");
var token = require("../token/token");



function pruebaUsuarios(req, res) {
 var fa="hola como estas faby";
 res.send(fa);
}

function crearUsuario(req, res) {
    var parametros = req.body;
    var nuevoUsuario = new usr(0, parametros.usuario, parametros.password).add();
    if (parametros.password) {
        bcrypt.hash(parametros.password, null, null, function (error, hash) {
            nuevoUsuario.password = hash;
            db.task(t => {
                    return t.result('SELECT * FROM usuarios WHERE usuario = $1', nuevoUsuario.usuario)
                        .then(result => {
                            if (result.rowCount == 0) {
                                db.one('INSERT INTO usuarios(usuario, password) VALUES($1, $2) RETURNING password', [nuevoUsuario.usuario, nuevoUsuario.password])
                                    .then(data => {
                                        console.log(data.password); // print new user id;
                                        res.status(200).send({
                                            mensaje: "el usuario se guardo"
                                        });
                                    })
                                    .catch(error => {
                                        console.log('ERROR:', error); // print error;
                                    });
                            } else {
                                res.status(404).send({
                                    mensaje: "el usuario ya existe"
                                });
                            }
                        });
                })
                .catch(error => {
                    // error;
                    res.status(500).send({
                        mensaje: "no hay servidor"
                    });
                });



        })
        console.log(nuevoUsuario.password);
    }


}

function login(req, res) {
    var loginUsuario = new usr(0, req.params.usuarios, req.params.password);
    db.one("SELECT * FROM usuarios WHERE usuario = $1", loginUsuario.usuario)
        .then(data => {
            bcrypt.compare(loginUsuario.password, data.password, function (error, ok) {
                if (ok) {
                    if (parametros.token) {
                        loginUsuario.id = data.id;
                        loginUsuario.password = data.password;
                        res.status(200).send({
                            token: token.crearToken(loginUsuario),
                            usuario: loginUsuario
                        });
                    }
                    res.status(200).send({
                        mensaje: "usuario autorizado"
                    });

                } else {
                    res.status(404).send({
                        mensaje: "usuario no autorizado"
                    });
                }
            });
        })
        .catch(error => {
            // error;
            res.status(404).send({
                mensaje: "no existe el usuario"
            });
        });


}

function deleteUser(req, res) {
    var deleteUsuario = new usr(req.params.id);
    var query = "DELETE FROM usuarios WHERE id=$1"

    db.result(query, deleteUsuario.id)
        .then(count => {
            res.status(200).send({
                mensaje: "eliminado "
            });
        })
        .catch(error => {
            res.status(404).send({
                mensaje: "no se pudo eliminar"
            });
        });

}

function actualizarUsuario(req, res) {
    var parametros = req.body;
    var updateUser = new usr(parametros.id, parametros.usuario, parametros.password).add();
    var query = "UPDATE usuarios SET usuario=$2, password=$3 WHERE id=$1 RETURNING password";

    /*db.one(query, [updateUser.id, updateUser.usuario, updateUser.password])
        .then(data => {
            console.log(data.password); // print new user id;
            res.status(200).send({ mensaje: "el usuario se ha modificado" });
        })
        .catch(error => {
            console.log('ERROR:', error); // print error;
        });*/

    if (updateUser.password) {
        bcrypt.hash(parametros.password, null, null, function (error, hash) {
            updateUser.password = hash;
            db.task(t => {
                    return t.result('SELECT * FROM usuarios WHERE id = $1', updateUser.id)
                        .then(result => {
                            if (result.rowCount != 0) {
                                db.one(query, [updateUser.id, updateUser.usuario, updateUser.password])
                                    .then(data => {

                                        console.log(data.password); // print new user id;
                                        res.status(200).send({
                                            mensaje: "el usuario se ha modificado"
                                        });
                                    })
                                    .catch(error => {
                                        console.log('ERROR:', error); // print error;
                                    });
                            } else {
                                res.status(404).send({
                                    mensaje: "No existe el usuario a modificar"
                                });
                            }
                        });
                })
                .catch(error => {
                    // error;
                    res.status(500).send({
                        mensaje: "No funciona"
                    });
                });



        })
        console.log(updateUser.password);
    }



}



module.exports = {
    pruebaUsuarios,
    crearUsuario,
    login,
    deleteUser,
    actualizarUsuario

}
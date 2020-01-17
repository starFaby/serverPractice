var token = require("jwt-simple");
var moment = require("moment");
var claveSecreta = "MiClave#; kl";

exports.autenticar = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ mensaje: "la peticion no tiene token" });
    } else {
        var tokenEnviado = req.headers.authorization.replace(/['"]+/g, "");
        try {
            var cargarToken = token.decode(tokenEnviado, claveSecreta);
            if (cargarToken.exp <= moment().unix()) {
                return res.status(403).send({ mensaje: "El token expiro" });
            }
        }catch(exception){
            console.log(exception);
            return res.status(403).send({ mensaje: "El token expiro" });
        }
        req.usuarioToken = cargarToken;
        next();
    }
}
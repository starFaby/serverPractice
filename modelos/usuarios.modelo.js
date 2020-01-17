class Usuario {
   
    constructor(id, usuario, password) {
        this.id = id;
        this.usuario = usuario;
        this.password = password;
    }

    add() {
        var usr = {
            id: this.id,
            usuario: this.usuario,
            password: this.password
        }
        return usr;
    }

}

module.exports = Usuario;
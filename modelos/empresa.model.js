class Empresa {
   
    constructor(emprId,emprCodigo, emprNombre, emprCiudad, emprDireccion, emprTipo) {
        this.emprId=emprId;
        this.emprCodigo = emprCodigo;
        this.emprNombre = emprNombre;
        this.emprCiudad = emprCiudad;
        this.emprDireccion = emprDireccion;
        this.emprTipo = emprTipo;
    }

    add() {
        var empresa = {
            emprId:this.emprId,
            emprCodigo: this.emprCodigo,
            emprNombre: this.emprNombre,
            emprCiudad: this.emprCiudad,
            emprDireccion: this.emprDireccion,
            emprTipo: this.emprTipo
        }
        return empresa
    }
}

module.exports = Empresa;
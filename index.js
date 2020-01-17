"use strict"


var app = require("./app");
var port = process.env.PORT || 2200;

app.listen(port, function(){

    console.log("Servidor del ApiRest en http://localhost:"+port)

})


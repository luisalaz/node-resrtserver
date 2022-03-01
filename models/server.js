const express = require('express')
var cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        //Middlewares (funciones que agregan funcionalidad a mi ws (siempre se ejecuta cuando se levanta el servidor))
        this.middlewares();
        //rutas de mi app
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static("public"));
    }

    routes(){
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }

}

module.exports = Server;
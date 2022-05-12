const express = require('express')
var cors = require('cors');
const {dbConnection} = require('../database/config')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth : '/api/auth',
            category : '/api/categorys',
            product : '/api/products',
            user: '/api/users',
            find: '/api/find'
        }

        //Conectar a la BD
        this.connectDB();

        //Middlewares (funciones que agregan funcionalidad a mi ws (siempre se ejecuta cuando se levanta el servidor))
        this.middlewares();
        //rutas de mi app
        this.routes();
    }

    async connectDB(){

        await dbConnection();

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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.find, require('../routes/find'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.category, require('../routes/categorys'));
        this.app.use(this.paths.product, require('../routes/products'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }

}

module.exports = Server;
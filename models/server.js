const express = require('express')
var cors = require('cors');
const {dbConnection} = require('../database/config');
const fileupload = require('express-fileupload');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth : '/api/auth',
            category : '/api/categorys',
            product : '/api/products',
            user: '/api/users',
            find: '/api/find',
            uploads: '/api/uploads',
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

        // Fileupload - Carga de archivos
        this.app.use( fileupload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.find, require('../routes/find'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.category, require('../routes/categorys'));
        this.app.use(this.paths.product, require('../routes/products'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }

}

module.exports = Server;
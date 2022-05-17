const {Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagenCloudinary, mostrarImagen, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir } = require('../middlewares');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/', validarArchivoSubir , cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    validateFields
], actualizarImagenCloudinary )

router.get('/:coleccion/:id', [
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    validateFields
], mostrarImagen )



module.exports = router;
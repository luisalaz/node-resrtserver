

const dbValidators = require('./db-validators');
const generarJWT   = require('./generateJWT');
const googleVerify = require('./google-verigy');
const subirArchivo = require('./subir-archivo');


module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
}
const validateFields = require('../middlewares/validate-fields');
const valitateJWT = require('../middlewares/validate-jwt');
const validateRols = require('../middlewares/validate-rols');
const validarArchivo = require('../middlewares/validar-archivo');

module.exports = {
    ...validateFields,
    ...valitateJWT,
    ...validateRols,
    ...validarArchivo
}
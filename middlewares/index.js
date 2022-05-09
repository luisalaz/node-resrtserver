const validateFields = require('../middlewares/validate-fields');
const valitateJWT = require('../middlewares/validate-jwt');
const validateRols = require('../middlewares/validate-rols');

module.exports = {
    ...validateFields,
    ...valitateJWT,
    ...validateRols
}
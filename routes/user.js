const {Router} = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user');
const { existRol, existEmail, existUserById } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', userGet);

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La password es debe tener mas de 6 letras').isLength({min: 6}),
    check('email').custom(existEmail),
    //check('email', 'El correo no es válido').isEmail(),
   // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
   check('rol').custom(existRol),
    validateFields
], userPost); 

router.put('/:id',[
    check('id', 'No es un id Válido').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(existRol),
    validateFields //siempre tiene que ir al final de los check
    ], userPut);

router.delete('/:id',[
    check('id', 'No es un id Válido').isMongoId(),
    check('id').custom(existUserById),
    validateFields
],userDelete);

module.exports = router;
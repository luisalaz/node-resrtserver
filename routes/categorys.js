const {Router} = require('express');
const { check } = require('express-validator');
const { categorysGet, categoryGet, categoryPost, categoryPut, categoryDelete } = require('../controllers/categorys');
const { valitateJWT, validateFields, isRole } = require('../middlewares');
const { existCategoryById } = require('../helpers/db-validators');

const router = Router();

//obtenerCategorias - paginado - total - populate
router.get('/', categorysGet);

//populate {}
router.get('/:id',
[
    check('id', 'No es un id Válido').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields 
]
, categoryGet);

router.post('/',[
    valitateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], categoryPost); 

router.put('/:id',[
    valitateJWT,
    check('id', 'No es un id Válido').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields //siempre tiene que ir al final de los check
    ], categoryPut);

router.delete('/:id',[
    valitateJWT,
    isRole('ADMIN_ROLE'),//SE PUEDEN AGREGAR MAS ROLES
    check('id', 'No es un id Válido').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields
],categoryDelete);



module.exports = router;
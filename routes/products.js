const {Router} = require('express');
const { check } = require('express-validator');
const { createProduct, getProducts, getProduct, updatedProduct, deleteProduct } = require('../controllers/product');
const { valitateJWT, validateFields, isRole } = require('../middlewares');
const { existProductById } = require('../helpers/db-validators');
const { update } = require('../models/category');

const router = Router();

router.get('/', getProducts);

router.get('/:id',
[
    check('id', 'No es un id Válido').isMongoId(),
    check('id').custom(existProductById),
    validateFields 
]
, getProduct);


router.post('/',[
    valitateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'La categoria es obligatorio').not().isEmpty(),
    check('category', 'La categoria no es un id de mongo').isMongoId(),
    check('category').custom(existProductById),
    validateFields
], createProduct)

router.put('/:id',[
    valitateJWT,
    check('id', 'No es un id Válido').isMongoId(),
    check('id').custom(existProductById),
    validateFields //siempre tiene que ir al final de los check
    ], updatedProduct);

router.delete('/:id',[
    valitateJWT,
    isRole('ADMIN_ROLE'),//SE PUEDEN AGREGAR MAS ROLES
    check('id', 'No es un id Válido').isMongoId(),
    check('id').custom(existProductById),
    validateFields
],deleteProduct);


module.exports = router;
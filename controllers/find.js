const {response} = require('express');
const { User, Product, Category } = require('../models');
const {ObjectId} = require('mongoose').Types;

const collections = [
    'users', 
    'products', 
    'categorys', 
    'rols'
];

const findUsers = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid(termino);
    
    if (isMongoId) {
        const user = await User.findById(termino);
        return res.json({
            results: user ? [user]: []
        });
    }

    const regex = new RegExp(termino, 'i');//insensible a las minisculas o mayusculas

    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}]
    });

    res.json({
        results: users
    });

}

const findCategorys = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const categoria = await Category.findById(termino);
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const categorias = await Category.find({ name: regex, status: true });

    res.json({
        results: categorias
    });

}

const findProducts = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const producto = await Product.findById(termino)
                            .populate('category','name');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const productos = await Product.find({ name: regex, status: true })
                            .populate('category','name')

    res.json({
        results: productos
    });

}


const find = (req, res = response) => {

    const {collection, termino} = req.params;

    if (!collections.includes(collection)){
        return res.status(400).json({message:`Las colecciones permitidas son: ${collections}`});
    }

    switch (collection){
        case 'users':
            findUsers(termino, res);
            break;
        case 'products':
            findProducts(termino, res);
            break;
        case 'categorys':
            findCategorys(termino, res);
            break;
        default:
            res.status(500).json({message:`Se me olvido hacer esta búsqueda`})
    }

}

module.exports = {
    find
}
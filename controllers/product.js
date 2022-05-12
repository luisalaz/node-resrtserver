const {response} = require('express');
const {Product, Category} = require('../models');

const createProduct = async (req, res = response) => {
    
    const name = req.body.name.toUpperCase();

    const product = await Product.findOne({name});

    if (product) {
        return res.status(400).json(
            {
                message:`El producto ${product.name} ya existe`
            });
    }

    const category = await Category
                        .findById(req.body.category);

    //data a guardar
    const data = {
        name,
        price: req.body.price,
        description: req.body.description,
        enabled: req.body.enabled,
        user: req.user._id,
        category: category._id
    }

    const newProduct = new Product(data);

    await newProduct.save();

    res.status(201).json(newProduct);
}

const getProducts = async(req, res = response) => {

    const filter = {status: true}

    const {limit=5, from = 0} = req.query;

    const [total, products] = await Promise.all([
        Product.countDocuments(filter),
        Product.find(filter)
            .skip(from)
            .limit(Number(limit))
            .populate('user', 'name')
            .populate('category', 'name')
    ]);

    res.json({
        total,
        products
    });
}

const getProduct = async(req, res = response) => {

    const {id} = req.params;

    const product = await Product
                        .findById(id)
                        .populate('user', 'name')
                        .populate('category', 'name');

    res.json({
        product
    });
}

const updatedProduct = async(req, res = response) => {

    const id = req.params.id;

    const {_id,user, category,status,...resto} = req.body;

    const categoryDB = await Category
                        .findById(req.body.category);

    resto.user = req.user._id;
    resto.name = resto.name.toUpperCase();
    resto.category = categoryDB._id;

    const updateProduct = await Product.findByIdAndUpdate(id, resto, {new: true});

    res.json(updateProduct);
}

const deleteProduct = async (req, res = response) => {
    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id, {status:false}, {new: true});

    const userAthenticated = req.user;//se obtiene desde el middleware validate-jwt
    
    res.json({
        product,
        userAthenticated
    });
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updatedProduct
}
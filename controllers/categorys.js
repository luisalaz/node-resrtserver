const {response} = require('express');
const {Category} = require('../models');

const categorysGet = async(req, res = response) => {

    const filter = {status: true}

    const {limit=5, from = 0} = req.query;

    const [total, categorys] = await Promise.all([
        Category.countDocuments(filter),
        Category.find(filter)
            .skip(from)
            .limit(Number(limit))
            .populate('user', 'name')
    ]);

    res.json({
        total,
        categorys
    });
}

const categoryGet = async(req, res = response) => {

    const {id} = req.params;

    const category = await Category
                        .findById(id)
                        .populate('user', 'name');

    res.json({
        category
    });
}

const categoryPost = async(req, res = response) => {

    const name = req.body.name.toUpperCase();

    const category = await Category.findOne({name});

    if (category) {
        return res.status(400).json(
            {
                message:`La categoria ${category.name} ya existe`
            });
    }

    //data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const newCategory = new Category(data);

    await newCategory.save();

    res.status(201).json(newCategory);
}

const categoryPut = async(req, res = response) => {

    const id = req.params.id;

    const {_id,user,status,...resto} = req.body;

    resto.user = req.user._id;
    resto.name = resto.name.toUpperCase();

    const updateCategory = await Category.findByIdAndUpdate(id, resto, {new: true});

    res.json(updateCategory);
}

const categoryDelete = async (req, res = response) => {
    const {id} = req.params;

    const category = await Category.findByIdAndUpdate(id, {status:false}, {new: true});

    const userAthenticated = req.user;//se obtiene desde el middleware validate-jwt
    
    res.json({
        category,
        userAthenticated
    });
}

module.exports = {
     categorysGet,
     categoryGet,
     categoryPost,
     categoryPut,
     categoryDelete
}
const Rol = require('../models/rol');
const {User, Category, Product} = require('../models');

const existRol = async (rol='') =>{
    const existRol = await Rol.findOne({rol});
    if (!existRol){
        throw new Error(`El rol ${rol} no esta registrado en la bd`);
    }
}

const existEmail = async (email='') =>{

    const existEmail = await User.findOne({email});

    if ( existEmail) {
        throw new Error(`El email ${email} ya se encuentra registrado en la bd`);
    }
}

const existUserById = async (id='') =>{

    const existUser = await User.findOne({id});

    if ( !existUser) {
        throw new Error(`El Usuario con id ${id} no se encuentra registrado en la bd`);
    }
}

const existCategoryById = async (id='') =>{

    const existCategory = await Category.findById(id);

    if ( !existCategory) {
        throw new Error(`La categoria con id ${id} no se encuentra registrado en la bd`);
    }
}

const existProductById = async (id='') =>{

    const existProduct = await Product.findById(id);

    if ( !existProduct) {
        throw new Error(`El producto con id ${id} no se encuentra registrado en la bd`);
    }
}

module.exports = { 
    existRol,
    existEmail, 
    existUserById, 
    existCategoryById,
    existProductById
}
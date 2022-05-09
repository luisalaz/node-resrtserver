const {response} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');


const login = async (req, res= response) => {

    const {email, password} = req.body;
    try{
        const user = await User.findOne({ email });//sabemos que existe ya que paso el check middleware

        if (!user){
            return res.status(400).json(
                {
                    msg: 'Usuario / password incorrect - email'
                }
            );
        }

        if (!user.status){
            return res.status(400).json(
                {
                    msg: 'Usuario / password incorrect - estado : false'
                }
            );
        }

        const validatePass = bcryptjs.compareSync(password, user.password);

        if (!validatePass){
            return res.status(400).json(
                {
                    msg: 'Usuario / password incorrect - password : false'
                }
            );
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    }catch(err){
        console.log(err);
        res.status(500).json(
                {
                    msg: 'Error inesperado, contacte al administrador'
                }
            );
    }
    
}

module.exports = {
    login
}
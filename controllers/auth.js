const {response} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verigy');


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

const googleSingIn = async (req, res = response) => {
    const {id_token} = req.body;

    try {


        const {name, email, picture} = await googleVerify(id_token);


        let user = await User.findOne({email});

        if (!user){
            //tengo que crearlos
            const data = {
                name,
                email, 
                password : ':P',
                img: picture,
                google: true,
                rol : 'USER_ROLE'
            }

            user = new User(data);
            await user.save();
        }

        console.log(email)

        if (!user.status){
            return res.status(401).json({message: 'Hable con el admin, usuario bloqueado'});
        }

        //generar el JWT

        const token = await generateJWT(user.id);


        res.json(
            {
                user,
                token
            }
        );
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'El token no se pudo verificar'})
    }
} 

module.exports = {
    login,
    googleSingIn
}
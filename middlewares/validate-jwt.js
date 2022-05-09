const {request, response} = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const valitateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({message: 'No hay token en la petición'})
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRET_KEY);

        req.uid = uid;

        const user = await User.findById(uid);

        if (!user){
            return res.status(401).json({message:'Token no valido - Usuario no existe'});
        }

        if (!user.status){
            return res.status(401).json({message:'Token no valido - Usuario con estado : false'});
        }

        req.user = user;

        next();
        
    } catch (error) {
        console.error(error);
        res.status(401).json({message: 'token no valido'})
    }
}

module.exports = {
    valitateJWT
}
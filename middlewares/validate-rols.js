const {request, response} = require('express');


const isAdminRol = (req, res = response, next) => {

    if (!req.user){
        return res.status(500).json({message: 'se quiere validar el rol sin validar el token primero'});
    }

    const {rol, name} = req.user;

    if (rol !== 'ADMIN_ROLE'){
        return res.status(401).json({message: `${name} no es administrador - no puede realizar esta acción`});
    }

    next();
}

const isRole = (...rols) => {


    return (req, res = response, next) => {

        if (!req.user){
            return res.status(500).json({message: 'se quiere validar el rol sin validar el token primero'});
        }
    
        const {rol, name} = req.user;
    
        if (!rols.includes(rol)){
            return res.status(401).json({message: `${name} no es administrador - no puede realizar esta acción`});
        }

        next();

    }
    
}


module.exports = { isAdminRol, isRole };

const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const userGet = async(req, res = response) => {

    const filter = {status: true}

    const {limit=5, from = 0} = req.query;
   
    //  const users = await User.find(filter)
    //                         .skip(from)
    //                        .limit(Number(limit));

    // const total = await User.countDocuments(filter);

    const [total, users] = await Promise.all([
        User.countDocuments(filter),
        User.find(filter)
            .skip(from)
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const userPost = async (req, res = response) => {

    
    const {name, email, password, rol} = req.body;
    const user = new User({name, email, password, rol});


    //encriptar pass
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //guardar en bd
    await user.save();

    res.json({
        msg: 'post Api - controllers',
        user
    });
}

const userPut = async(req, res = response) => {

    const id = req.params.id;

    const {_id, password, google,correo, ...resto} = req.body;

    if (password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put Api - controllers',
        id
    });
}

const userDelete = async (req, res = response) => {
    const {id} = req.params;

    const uid = req.uid;//se obtiene desde el middleware validate-jwt

    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {status:false});

    const userAthenticated = req.user;//se obtiene desde el middleware validate-jwt
    
    res.json({
        user,
        userAthenticated
    });
}


module.exports = {
     userGet,
     userPost,
     userPut,
     userDelete
}
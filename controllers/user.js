const {response} = require('express');

const userGet = (req, res = response) => {

    const {name} = req.query;

    res.json({
        msg: 'get Api - controllers',
        name
    });
}

const userPost = (req, res = response) => {
    
    const {name, age} = req.body;

    res.json({
        msg: 'post Api - controllers',
        name,
        age
    });
}

const userPut = (req, res = response) => {

    const id = req.params.id;
    res.json({
        msg: 'put Api - controllers',
        id
    });
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete Api - controllers'
    });
}


module.exports = {
     userGet,
     userPost,
     userPut,
     userDelete
}
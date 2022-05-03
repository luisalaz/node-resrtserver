
const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: 'string',
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type: 'string',
        required: [true, 'El email es obligatorio'],
        unique: true,
    },
    password:{
        type: 'string',
        required: [true, 'La contraseña es obligatorio']
    },
    img:{
        type: 'string'
    },
    rol:{
        type: 'string',
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})

//Sobreescribiendo un metodo
//tienen que ser una funcion ya que una funcion de flecha mantienen el this fuera de la misma
/*
la funcion retorna al usuari sin version y passaword en la respuesta a una llamada rest
*/
UserSchema.methods.toJSON = function () {
    const {__v, password, ...user} = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);
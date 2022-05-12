const {Schema, model} = require('mongoose');

const ProductSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    price:{
        type: Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Category',
        required: true
    },
    description:{ type: String},
    enable:{type: Boolean, default: true}

});

// CategorySchema.methods.toJSON = function () {
//     const {__v, _id, status, ...category} = this.toObject();
//     return category;
// }

module.exports = model('Product', ProductSchema);
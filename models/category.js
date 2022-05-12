const {Schema, model} = require('mongoose');

const CategorySchema = Schema({

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
    }

});

CategorySchema.methods.toJSON = function () {
    const {__v, _id, status, ...category} = this.toObject();
    return category;
}

module.exports = model('Category', CategorySchema);
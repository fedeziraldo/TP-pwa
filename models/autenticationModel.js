const mongoose = require('../bin/mongodb');
var UsuariosSchemna = mongoose.Schema({
    name:String,
    usuario:{
        type: String,
        required: [true,"El campo usuario es obligatorio"],
        unique: true
        },
    password:{
        type: String,
        trim: true,
        required: [true,"El password es obligatorio"],
        minlength: [6,"El password debe tener al menos 6 caracteres"],
        maxlength: [8,"El password debe tener como máximo 8 caracteres"]
        },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
            return /\d{2}-\d{4}-\d{4}/.test(v);
            },
            message: '{VALUE} no es un teléfono válido!'
        },
        required: [true, 'El campo teléfono es obligatorio']
    },
    email:{
        type:String,
        required: [true, 'El campo email es obligatorio']
    },
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports  =  mongoose.model('users',UsuariosSchemna)
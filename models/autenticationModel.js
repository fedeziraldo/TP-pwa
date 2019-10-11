const mongoose = require('../bin/mongodb');
var UsuariosSchemna = mongoose.Schema({
    nombre:String,
    apellido:String,
    password:{
        type: String,
        trim: true,
        required: [true,"El password es obligatorio"],
        minlength: [6,"El password debe tener al menos 6 caracteres"],
        maxlength: [8,"El password debe tener como máximo 8 caracteres"]
        },
    email:{
        type:String,
        required: [true, 'El campo email es obligatorio'],
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    eliminado: {
        type: Boolean,
        default: false
    },
    activo: {
        type: Boolean,
        default: false
    }
})

module.exports  =  mongoose.model('users',UsuariosSchemna)
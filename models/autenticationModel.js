const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UsuariosSchemna = Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, "El password es obligatorio"],
        minlength: [4, "El password debe tener al menos 4 caracteres"],
        maxlength: [8, "El password debe tener como máximo 8 caracteres"]
    },
    email: {
        type: String,
        required: [true, 'El campo email es obligatorio'],
        unique: true,
        trim: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    fEliminado: Date,
    activo: {
        type: Boolean,
        default: false
    }
})

UsuariosSchemna.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

UsuariosSchemna.plugin(mongoose.mongoosePaginate);

module.exports = mongoose.model('users', UsuariosSchemna)
const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

var UsuariosSchemna = Schema({
    nombre:{
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    padre: {type:Schema.ObjectId, ref:"categorias"},
    fEliminado: Date
})

module.exports  =  mongoose.model('categorias',UsuariosSchemna)
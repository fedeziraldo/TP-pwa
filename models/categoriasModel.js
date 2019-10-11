const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

var UsuariosSchemna = Schema({
    nombre:String,
    padre: {type:Schema.ObjectId, ref:"categorias"},
    fEliminado: Date
})

module.exports  =  mongoose.model('categorias',UsuariosSchemna)
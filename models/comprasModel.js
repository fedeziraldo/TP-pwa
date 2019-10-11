const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

const productoSchema = require("./productosModel").schema;

var ComprasSchema = Schema({
    producto: productoSchema,
    usuario: {type:Schema.ObjectId, ref:"users"},
    fecha: {
        type: Date,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
})

module.exports  =  mongoose.model('compras',ComprasSchema)
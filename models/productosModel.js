const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    denominacion: {
        type: String,
        trim: true,
        required: true,
    },
    sku: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    precio: {
        type: Number,
        required: true
    },
    precioOferta: Number,
    categoria: { type: Schema.ObjectId, ref: "categorias" },
    descripcion: {
        type: String,
        trim: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    destacado: {
        type: Boolean,
        default: false
    },
    fEliminado: Date
});

module.exports = {
    schema: ProductoSchema,
    model: mongoose.model('productos', ProductoSchema)
}


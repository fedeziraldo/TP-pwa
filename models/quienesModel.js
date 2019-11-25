const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

const QuienesSchema = Schema({
    titulo: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    contacto: {
        type: String,
        trim: true
    },
    fAlta: Date,
    fEliminado: Date
})

module.exports = mongoose.model('quienes', QuienesSchema)
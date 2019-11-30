const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

const HistoriaSchema = Schema({
    titulo: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    }
    //imagen??
})

module.exports = mongoose.model('historia', HistoriaSchema)
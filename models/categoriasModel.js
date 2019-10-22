const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

const CategoriasSchemna = Schema({
    nombre: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    padre: { type: Schema.ObjectId, ref: "categorias" },
    fEliminado: Date
})

CategoriasSchemna.plugin(mongoose.mongoosePaginate);

module.exports = mongoose.model('categorias', CategoriasSchemna)
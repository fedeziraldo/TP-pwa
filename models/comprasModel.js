const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

const productoSchema = require("./productosModel").schema;

const ComprasSchema = Schema({
    producto: productoSchema,
    usuario: { type: Schema.ObjectId, ref: "users" },
    fecha: {
        type: Date,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    forma_pago:
    {
        type: String,
        required: true
    }
})

ComprasSchema.plugin(mongoose.mongoosePaginate);

module.exports = mongoose.model('compras', ComprasSchema)
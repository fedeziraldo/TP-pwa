const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

const productoSchema = require("./productosModel").schema;

const ComprasSchema = Schema({
    producto: productoSchema,
    usuario: { type: Schema.ObjectId, ref: "users", required: true },
    fecha: {
        type: Date,
        required: true,
        default: new Date()
    },
    cantidad: {
        type: Number,
        required: true
    },
    forma_pago:
    {
        type: String,
        required: true
    },
    estadoPago:
    {
        type: String,
        required: true,
        default: "Pendiente"
    },
    aPagar: Number
})

ComprasSchema.plugin(mongoose.mongoosePaginate);

module.exports = mongoose.model('compras', ComprasSchema)
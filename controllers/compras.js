const comprasModel = require("../models/comprasModel");
const productosModel = require("../models/productosModel").model;

module.exports = {
    getAll: async function (req, res, next) {
        try {
            var producto = await comprasModel.paginate({

            }, {
                populate: 'usuario', page: req.query.page
            })
            res.status(200).json({ status: "success", message: "ok", data: producto });
        } catch (err) {
            console.log(err);
            next(err);
        }


    },

    getThisCompras: async function (req, res, next) {
        try {
            var data = await comprasModel.find({ usuario: req.body.userId });
            res.status(200).json({ status: "success", message: "ok", data: data });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    getById: async function (req, res, next) {
        try {
            var data = await comprasModel.findById(req.params.id);
            res.status(200).json({ status: "success", message: "ok", data: data });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    save: async function (req, res, next) {
        try {
            let prod = await productosModel.findById(req.body.producto._id);
            if (prod == null || prod.stock < req.body.cantidad) {
                res.status(500).json({ status: "error", message: "no hay stock del producto" });
            } else {
                prod.stock -= req.body.cantidad;
                await prod.save()
            }

            var compra = new comprasModel({
                producto : req.body.producto,
                usuario: req.body.userId,
                forma_pago: req.body.forma_pago,
                cantidad: req.body.cantidad,
                aPagar: req.body.cantidad * req.body.producto.precioOferta ? req.body.producto.precioOferta : req.body.producto.precio
            });
            var result = await compra.save();

            res.status(200).json({ status: "success", message: "Compra added successfully!!!", data: result });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

}

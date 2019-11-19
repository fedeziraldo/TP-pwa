const productosModel = require("../models/productosModel").model;

module.exports = {
    getAll: async function (req, res, next) {
        try {
            var producto = await productosModel.paginate({}, { populate: 'categoria', limit: 16 });
            res.status(200).json({ status: "success", message: "ok", data: producto });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    getDestacados: async function (req, res, next) {
        try {
            var producto = await productosModel.paginate({ destacado: true }, { limit: 16 });
            res.status(200).json({ status: "success", message: "ok", data: producto });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    getById: async function (req, res, next) {
        try {
            var data = await productModel.findById(req.params.id);
            res.status(200).json({ status: "success", message: "ok", data: data });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    save: async function (req, res, next) {
        try {
            var product = new productosModel({
                denominacion: req.body.denominacion,
                sku: req.body.sku,
                precio: req.body.precio,
                precioOferta: req.body.precioOferta,
                categoria: req.body.categoria == "" ? null : req.body.categoria,
                descripcion: req.body.descripcion,
                stock: req.body.stock,
                destacado: req.body.destacado,
            });
            var result = await product.save();

            res.status(200).json({ status: "success", message: "Product added successfully!!!", data: result });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    eliminar: async function (req, res, next) {
        try {
            var data = await productosModel.findByIdAndUpdate(req.params.id, { $set: { fEliminado: new Date() } });
            res.json({ status: "success", data: data });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    asociarImagen: async function (prod_id, path) {
        try {
            var data = await productosModel.findById(prod_id);

            data.imagenes.push(path);
            await data.save();

            return;
        } catch (err) {
            console.log(err);
            next(err);
        }
    },
}

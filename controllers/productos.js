var productosModel = require("../models/productosModel")
var categoriasModel = require("../models/categoriasModel")

module.exports = {
    getAll: async function (req, res, next) {
        try {
            var producto = await productosModel.paginate({

            }, {
                populate: 'categoria', page: req.query.page
            })
            res.status(200).json({ status: "success", message: "ok", data: producto });
        } catch (err) {
            next(err);
        }


    },

    getById: async function (req, res, next) {
        var data = await productModel.findById(req.params.productId);
        res.status(200).json({ status: "success", message: "ok", data: data });
    },

    save: async function (req, res, next) {
        var product = new productModel({
            denominacion: req.body.name,
            sku: req.body.sku,
            precio: req.body.price,
            precioOferta: req.body.precioOferta,
            categoria: req.body.categoria,
            descripcion: req.body.descripcion,
            cantidad: req.body.cantidad,
            destacado: req.body.destacado,
        });
        var result = await product.save()

        res.status(200).json({ status: "success", message: "Product added successfully!!!", data: result });
    },

    eliminar: async function(req, res, next) {
      try{
        var data = await productosModel.findByIdAndUpdate(req.params.id, { $set: {fEliminado: new Date()}});
        res.json({status: "success", data: data}); 
      }catch(err){
        console.log(err)
        next(err);
      }
    }
}

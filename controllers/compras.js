const comprasModel = require("../models/comprasModel");

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

    save: async function (req, res, next) {
        try {
            var compra = new comprasModel({
            });
            var result = await compra.save();

            res.status(200).json({ status: "success", message: "Compra added successfully!!!", data: result });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

}

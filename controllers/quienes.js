const quienesModel = require("../models/quienesModel");

module.exports = {
    saveQuienes: async function (req, res, next) {
        try {
            //ToDo: hay que poner fecha de eliminado al activo y dar de alta el nuevo
            var data = await quienesModel.create({ titulo: req.body.titulo, descripcion: req.body.descripcion, contacto: req.body.contacto, fAlta: new Date()});
            res.json({ status: "success", message: "Quienes added successfully!!!", data: data });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

  getQuienes: async function (req, res, next) {
    try {
      var data = await quienesModel.find({ fEliminado: {$ne: null}});
      res.json({ status: "success", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}


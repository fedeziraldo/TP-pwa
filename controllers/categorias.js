const categoriasModel = require("../models/categoriasModel");

module.exports = {
  save: async function (req, res, next) {
    try {
      var data = await categoriasModel.create({ nombre: req.body.nombre, padre: req.body.padre == "" ? null: req.body.padre });
      res.json({ status: "success", message: "Categoria added successfully!!!", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  getAll: async function (req, res, next) {
    try {
      var data = await categoriasModel.find().populate('padre');
      res.json({ status: "success", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  eliminar: async function (req, res, next) {
    try {
      var data = await categoriasModel.findByIdAndUpdate(req.params.id, { $set: { fEliminado: new Date() } });
      res.json({ status: "success", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

}


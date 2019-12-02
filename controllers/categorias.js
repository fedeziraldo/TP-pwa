const categoriasModel = require("../models/categoriasModel");
const productosModel = require("../models/productosModel").model;

module.exports = {
  save: async function (req, res, next) {
    try {
      var data = await categoriasModel.create({ nombre: req.body.nombre, padre: req.body.padre == "" ? null : req.body.padre });
      res.json({ status: "success", message: "Categoria added successfully!!!", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  getAll: async function (req, res, next) {
    try {
      let query = {};
      if (req.query.nombre) query.nombre = new RegExp(`\\w*${req.query.nombre}\\w*`);
      query.fEliminado = null

      let options = {
        sort: {nombre :1},
        populate: 'padre',
        limit: 99999999999,
        page: req.query.page ? req.query.page : 1
      };

      var data = await categoriasModel.paginate(query, options);
      res.json({ status: "success", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  eliminar: async function (req, res, next) {
    try {
      var data = await categoriasModel.findByIdAndUpdate(req.params.id, { $set: { fEliminado: new Date() } });
      await categoriasModel.updateMany({fEliminado: null, padre: req.params.id}, {padre: data.padre})
      await productosModel.updateMany({fEliminado: null, categoria: req.params.id}, {categoria: data.padre})
      res.json({ status: "success", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

}


const historiaModel = require("../models/historiaModel");

module.exports = {
    saveHistoria: async function (req, res, next) {
        try {
            var cant = await historiaModel.countDocuments();
            var data;

            if (cant == 0)
                data = await historiaModel.create({ titulo: req.body.titulo, descripcion: req.body.descripcion});
            else
                data = await historiaModel.findOneAndUpdate({}, { titulo: req.body.titulo, descripcion: req.body.descripcion })
            
            res.json({ status: "success", message: "historia added successfully!!!", data: data });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

  getHistoria: async function (req, res, next) {
    try {
      var data = await historiaModel.findOne();
      res.json({ status: "success", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}


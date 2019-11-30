const quienesModel = require("../models/quienesModel");

module.exports = {
    saveQuienes: async function (req, res, next) {
        try {
            var cant = await quienesModel.countDocuments();
            var data;

            if (cant == 0)
                data = await quienesModel.create({ titulo: req.body.titulo, descripcion: req.body.descripcion, contacto: req.body.contacto, fAlta: new Date()});
            else
                data = await quienesModel.findOneAndUpdate({}, { titulo: req.body.titulo, descripcion: req.body.descripcion, contacto: req.body.contacto })
            
            res.json({ status: "success", message: "Quienes added successfully!!!", data: data });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

  getQuienes: async function (req, res, next) {
    try {
      //var data = await quienesModel.find({ fEliminado: {$ne: null}});
      var data = await quienesModel.findOne();
      console.log(data);
      res.json({ status: "success", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}


var autenticationModel = require("../models/autenticationModel");

module.exports = {
  save: async function(req, res, next) {
    try{
      var data = await autenticationModel.create({ name: req.body.name, usuario: req.body.usuario, password: req.body.password, phone: req.body.phone, email: req.body.email });
      res.json({status: "success", message: "User added successfully!!!", data: data}); 
    }catch(err){
      console.log(err)
      next(err);
    }
    
  },

  getAll: async function(req, res, next) {
    try{
      var data = await autenticationModel.find();
      res.json({status: "success", data: data}); 
    }catch(err){
      console.log(err)
      next(err);
    }
    
  }
}


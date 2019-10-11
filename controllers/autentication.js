const autenticationModel = require("../models/autenticationModel");
const jwt = require('jsonwebtoken');

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
  },

  loginUsuario: async function(req, res, next) {
    try{
      var usuario = await autenticationModel.findOne({usuario:req.body.usuario});
        if (usuario) {
          if(req.body.password == usuario.password) {
            const token = jwt.sign({id: usuario._id}, req.app.get('secretKeyUsuarios'), { expiresIn: '1h' });
            console.log(token,usuario)
            res.status(200).json({status:"success", message: "user found!!!", data:{user: usuario, token:token}});
          }else{
            res.status(400).json({status:"error", message: "Invalid user/password!!!", data:null});
          }          
      }else{
        res.status(400).json({status:"not_found", message: "user not found!!!", data:null});
      }
    }catch(err){
      console.log(err)
      next(err);
    }
  },

  loginAdmin: async function(req, res, next) {
    try{
      var usuario = await autenticationModel.findOne({usuario:req.body.usuario, admin: true});
        if (usuario) {
          if(req.body.password == usuario.password) {
            const token = jwt.sign({id: usuario._id}, req.app.get('secretKeyAdmin'), { expiresIn: '1h' });
            console.log(token,usuario)
            res.status(200).json({status:"success", message: "user found!!!", data:{user: usuario, token:token}});
          }else{
            res.status(400).json({status:"error", message: "Invalid user/password!!!", data:null});
          }          
      }else{
        res.status(400).json({status:"not_found", message: "user not found!!!", data:null});
      }
    }catch(err){
      console.log(err)
      next(err);
    }
  }
}


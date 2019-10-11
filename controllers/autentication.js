const autenticationModel = require("../models/autenticationModel");
const jwt = require('jsonwebtoken');

module.exports = {
  save: async function(req, res, next) {
    try{
      var data = await autenticationModel.create({ nombre: req.body.nombre, apellido: req.body.apellido, password: req.body.password, email: req.body.email });
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

  getThisUser: async function(req, res, next) {
    try{
      var data = await autenticationModel.findById(req.body.userId);
      res.json({status: "success", data: data}); 
    }catch(err){
      console.log(err)
      next(err);
    }
  },

  loginUsuario: async function(req, res, next) {
    try{
      var usuario = await autenticationModel.findOne({email:req.body.email, activo: true, eliminado: false});
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
      var usuario = await autenticationModel.findOne({email:req.body.email, admin: true, activo: true, eliminado: false});
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
  },

  activar: async function(req, res, next) {
    try{
      var data = await autenticationModel.findByIdAndUpdate(req.body.id, { $set: {activo: true}});
      res.json({status: "success", data: data}); 
    }catch(err){
      console.log(err)
      next(err);
    }
  },

  eliminar: async function(req, res, next) {
    try{
      var data = await autenticationModel.findByIdAndUpdate(req.body.id, { $set: {eliminado: true}});
      res.json({status: "success", data: data}); 
    }catch(err){
      console.log(err)
      next(err);
    }
  }
}


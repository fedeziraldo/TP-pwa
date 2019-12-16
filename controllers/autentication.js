const autenticationModel = require("../models/autenticationModel");
const passwordResetToken = require("../models/resetTokenModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
var transporter = require("../bin/email")

autenticationModel.create({ nombre: "root", apellido: "root", password: "root", email: "root", admin: true, activo: true }, function (err) {
  if (err) {
    console.log("Ya esta creado root");
    return;
  }
  console.log("Root added successfully!!!");
});

module.exports = {
  saveUsuario: async function (req, res, next) {
    try {
      var data = await autenticationModel.create({ nombre: req.body.nombre, apellido: req.body.apellido, password: req.body.password, email: req.body.email });
      let info = await transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to: req.body.email, // list of receivers
        subject: 'Bienvenido '+req.body.nombre + " a Ecommerce CLIENTE", // Subject line
        html: process.env.EMAIL_HTML + ` <a href="http://localhost:3000/autentication/activar/${data._id}">http://localhost:3000/autentication/activar/${data._id}</b>` // html body
      });
      res.json({ status: "success", message: "User added successfully!!!", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  saveAdmin: async function (req, res, next) {
    try {
      var data = await autenticationModel.create({ nombre: req.body.nombre, apellido: req.body.apellido, password: req.body.password, email: req.body.email, admin: true });
      let info = await transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to: req.body.email, // list of receivers
        subject: 'Bienvenido <b>'+req.body.nombre + "</b> a Ecommerce ADMINISTRADOR", // Subject line
        html: process.env.EMAIL_HTML + ` <a href="http://localhost:3000/autentication/activar/${data._id}">http://localhost:3000/autentication/activar/${data._id}</b>` // html body
      });
      res.json({ status: "success", message: "Admin added successfully!!!", data: data });
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
        limit: 99999999999,
        page: req.query.page ? req.query.page : 1
      };

      var data = await autenticationModel.paginate(query, options);
      res.json({ status: "success", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  getThisUser: async function (req, res, next) {
    try {
      var data = await autenticationModel.findById(req.body.userId);
      res.json({ status: "success", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  loginUsuario: async function (req, res, next) {
    try {
      var usuario = await autenticationModel.findOne({ email: req.body.email, activo: true, fEliminado: null });
      if (usuario) {
        if (bcrypt.compareSync(req.body.password, usuario.password)) {
          const token = jwt.sign({ id: usuario._id }, req.app.get('secretKeyUsuarios'), { expiresIn: '1h' });
          res.status(200).json({ status: "success", message: "user found!!!", data: { user: usuario, token: token } });
        } else {
          res.status(400).json({ status: "error", message: "Invalid user/password!!!", data: null });
        }
      } else {
        res.status(401).json({ status: "not_found", message: "user not found!!!", data: null });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  loginAdmin: async function (req, res, next) {
    try {
      var usuario = await autenticationModel.findOne({ email: req.body.email, admin: true, activo: true, fEliminado: null });
      if (usuario) {
        if (bcrypt.compareSync(req.body.password, usuario.password)) {
          const token = jwt.sign({ id: usuario._id }, req.app.get('secretKeyAdmin'), { expiresIn: '1h' });
          console.log(token, usuario)
          res.status(200).json({ status: "success", message: "user found!!!", data: { user: usuario, token: token } });
        } else {
          res.status(400).json({ status: "error", message: "Invalid user/password!!!", data: null });
        }
      } else {
        res.status(400).json({ status: "not_found", message: "user not found!!!", data: null });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  activar: async function (req, res, next) {
    try {
      var data = await autenticationModel.findByIdAndUpdate(req.params.id, { $set: { activo: true } });
      res.json({ status: "ha activado su cuenta", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  eliminar: async function (req, res, next) {
    try {
      var data = await autenticationModel.findByIdAndUpdate(req.params.id, { $set: { fEliminado: new Date() } });
      res.json({ status: "success", data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  
  recuperarContrasenia: async function (req, res, next) {
    try {
        var user = await autenticationModel.findOne({email:req.body.email});
        
        if (!user) {
          return res.status(409).json({ message: 'Email does not exist' });
        }
        
        var newPass = crypto.randomBytes(16).toString('hex');

        console.log("new = " + newPass)
        var resettoken = passwordResetToken.create({ _userId: user._id, resetToken: newPass});
        
        if (!resettoken) {
          return res.status(500).json({ message: "Error generando nueva pass" });
        }
        
        let info = transporter.sendMail({
          from: process.env.EMAIL_USER, // sender address
          to: req.body.email, // list of receivers
          subject: 'Recuperar contraseña', // Subject line
          html: 'Está recibiendo esto porque usted (u otra persona) ha solicitado restablecer la contraseña de su cuenta.\n\n' +
          'Haga clic en el siguiente enlace o péguelo en su navegador para completar el proceso.:\n\n' +
          'http://localhost:3001/reset-password/' + newPass + '\n\n' +
          'Si no solicitó esto, ignore este correo electrónico y su contraseña permanecerá sin cambios.\n'
        });

        res.status(200).json({ message: 'Reset Password successfully.' });

    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  validarTokenRecuperar: async function (req, res, next) {
    try {
      var user = await passwordResetToken.findOne({resetToken: req.body.resetToken});
      autenticationModel.findOneAndUpdate({ _id: user._userId }).then(() => {
        res.status(200).json({ message: 'Token verified successfully.' });
        }).catch((err) => {
        return res.status(500).send({ msg: err.message });
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  nuevaContrasenia: async function (req, res, next) {
    try {
        var userToken = await passwordResetToken.findOne({ resetToken: req.body.resetToken });

        if (userToken) {
          var user = await autenticationModel.findOne({_id: userToken._userId});
          if (user){
              var data = await autenticationModel.findByIdAndUpdate(
                userToken._userId, { password: bcrypt.hashSync(req.body.newPassword, 10)});

              if (data){
                await passwordResetToken.findOneAndRemove({ resetToken: req.body.resetToken })
                
                let info = transporter.sendMail({
                  from: process.env.EMAIL_USER, // sender address
                  to: data.email, // list of receivers
                  subject: 'Confirmación de nueva contraseña', // Subject line
                  html: 'Su nueva contraseña fue confirmada.\n\n'
                });
                
                return res.status(200).json({ message: 'Password reset successfully' });
              } else
                return res.status(500).json({ message: 'Error!!' });        
        } else
          return res.status(500).json({ message: 'Error!!' });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  
}


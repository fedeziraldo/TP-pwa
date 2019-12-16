var express = require('express');
var router = express.Router();
var autentication = require("../controllers/autentication");

/* GET home page. */
router.post('/registrarUsuario', autentication.saveUsuario);
router.post('/loginUsuario', autentication.loginUsuario);
router.post('/loginAdmin', autentication.loginAdmin);
router.get('/activar/:id', autentication.activar);
router.post('/req-reset-password', autentication.recuperarContrasenia);
router.post('/new-password', autentication.nuevaContrasenia);
router.post('/valid-password-token', autentication.validarTokenRecuperar);
module.exports = router;


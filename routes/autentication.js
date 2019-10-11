var express = require('express');
var router = express.Router();
var autentication = require("../controllers/autentication")

/* GET home page. */
router.post('/registrar', autentication.save);
router.post('/loginUsuario', autentication.loginUsuario);
router.post('/loginAdmin', autentication.loginAdmin);
module.exports = router;


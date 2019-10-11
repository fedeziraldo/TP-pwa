var express = require('express');
var router = express.Router();
var autentication = require("../controllers/autentication");
var compras = require("../controllers/compras");

router.get('/', autentication.getThisUser);
router.get('/compras', compras.getThisCompras);


module.exports = router;

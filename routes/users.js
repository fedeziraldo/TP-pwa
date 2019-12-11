var express = require('express');
var router = express.Router();
var autentication = require("../controllers/autentication");
var compras = require("../controllers/compras");

router.get('/', autentication.getThisUser);

module.exports = router;

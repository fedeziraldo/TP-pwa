var express = require('express');
var router = express.Router();
var autentication = require("../controllers/autentication")

router.get('/users', autentication.getAll);

module.exports = router;


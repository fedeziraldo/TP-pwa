var express = require('express');
var router = express.Router();
var autentication = require("../controllers/autentication");

router.get('/users', autentication.getAll);
router.delete('/users', autentication.eliminar);
router.put('/users', autentication.activar);

module.exports = router;


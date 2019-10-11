var express = require('express');
var router = express.Router();
var autentication = require("../controllers/autentication");
var categorias = require("../controllers/categorias");

router.get('/users', autentication.getAll);
router.delete('/users/:id', autentication.eliminar);
router.put('/users/:id', autentication.activar);

router.get('/categorias', categorias.getAll);
router.post('/categorias', categorias.save);
router.delete('/categorias/:id', categorias.eliminar);

module.exports = router;


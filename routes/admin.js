var express = require('express');
var router = express.Router();
var autentication = require("../controllers/autentication");
var categorias = require("../controllers/categorias");
var productos = require("../controllers/productos");
var compras = require("../controllers/compras");
var quienes = require("../controllers/quienes");

router.get('/users', autentication.getAll);
router.delete('/users/:id', autentication.eliminar);
router.post('/users/', autentication.saveAdmin);

router.get('/categorias', categorias.getAll);
router.post('/categorias', categorias.save);
router.delete('/categorias/:id', categorias.eliminar);

router.post('/productos', productos.save);
router.delete('/productos/:id', productos.eliminar);

router.get('/compras', compras.getAll);

router.get('/quienes', quienes.getQuienes);
router.post('/quienes', quienes.saveQuienes);

module.exports = router;


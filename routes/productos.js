var express = require('express');
var router = express.Router();
var productos = require("../controllers/productos")

router.get('/', productos.getAll);
router.get('/destacados', productos.getDestacados);
router.get('/:id', productos.getById);

module.exports = router;


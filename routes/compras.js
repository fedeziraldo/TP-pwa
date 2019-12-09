var express = require('express');
var router = express.Router();
var compras = require("../controllers/compras")

router.get('/', compras.getThisCompras);
router.get('/:id', compras.getById);
router.post('/', compras.save);

module.exports = router;


var express = require('express');
var router = express.Router();
var quienes = require("../controllers/quienes");
var historia = require("../controllers/historia");

router.get('/quienes', quienes.getQuienes);
router.get('/historia', historia.getHistoria);

module.exports = router;
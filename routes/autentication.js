var express = require('express');
var router = express.Router();
var autentication = require("../controllers/autentication")

/* GET home page. */
router.post('/', autentication.save);
router.get('/', autentication.getAll);
module.exports = router;


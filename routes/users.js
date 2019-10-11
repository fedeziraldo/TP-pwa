var express = require('express');
var router = express.Router();
var autentication = require("../controllers/autentication");

router.get('/', autentication.getThisUser);

module.exports = router;

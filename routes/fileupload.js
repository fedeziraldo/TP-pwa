const express = require('express');
const router = express.Router();
const path = require("path")

//require multer for the file uploads
const multer = require('multer');
// set the directory for the uploads to the uploaded to
const DIR = './public/images/';

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, DIR);
   },
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
});

//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
const upload = multer({storage}).single('photo');


router.post('/', function(req, res, next) {
     upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }  
       // No error occured.
        var path = req.file.path;
        return res.send("Upload Completed for "+path); 
  });     
  
});

module.exports = router;

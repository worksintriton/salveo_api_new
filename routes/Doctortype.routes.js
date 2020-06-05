var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Doctortype = require('./../models/Doctor_typeModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());

router.post('/create', function(req, res) {

        Doctortype.create({
          Image_icon: req.body.Image_icon,
          Name_of_the_type: req.body.Name_of_the_type,
        }, 

        function (err, user) {
          if (err) return res.status(500).send({message:"There was a problem in creating Doctortype details."});
          console.log(err)

              res.json({Status:"success",Message:"Data inserted successfully", Data : {},Code:200});
        });

});

router.get('/getlist', function (req, res) {
        Doctortype.find({}, function (err, Doctortypes) {
            if (err) return res.status(500).send("There was a problem finding the Doctortypes.");
              res.json({Status:"success",Message:"Data Listing successfully", Data : Doctortypes,Code:200});
        });
});

router.put('/edit/:id', function (req, res) {
            
            Doctortype.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.success(200, "Data Updated Successfully");
        
        });
});
// // DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {
      Doctortype.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting details.");
          res.success(200, "Data Deleted Successfully");
      });
});

module.exports = router;
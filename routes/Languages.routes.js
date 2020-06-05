var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Patient = require('./../models/PatientModel');
var Doctor = require('./../models/DoctorModel');
var Languages = require('./../models/LanguagesModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());


router.post('/create', async function(req, res) {
  try{

        await Languages.create({
          
            Languages: req.body.Languages,
        }, 
       async function (err, user) {
        res.json({Status:"Success",Message:"Added successfully", Data : user,Code:200}); 
        });
}
catch(e){
      res.error(500, "Internal server error");
}
});


router.get('/getlist', function (req, res) {
  
        Languages.find({}, function (err, Languagesdetails) {
          res.json({Status:"Success",Message:"Languagesdetails", Data : Languagesdetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        Languages.findByIdAndUpdate(req.body.Languages_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.status(500).send("There was a problem updating the user.");
             res.json({Status:"Success",Message:"Languagesdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      Languages.findByIdAndRemove(req.body.Specialization_id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.json({Status:"Success",Message:"Languagesdetails Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;

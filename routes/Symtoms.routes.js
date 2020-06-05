var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Patient = require('./../models/PatientModel');
var Doctor = require('./../models/DoctorModel');
var SymptomsModel = require('./../models/SymptomsModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());


router.post('/create', async function(req, res) {
  try{

        await SymptomsModel.create({
            Symptoms_image:req.body.Symptoms_image,
            Symptoms_Shown: req.body.Symptoms_Shown,
            Specializations: req.body.Specializations
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.error(500, "Internal server error");
}
});


router.get('/getlist', function (req, res) {
  
        SymptomsModel.find({}, function (err, Symptomsdetails) {
          res.json({Status:"Success",Message:"Symptomsdetails", Data : Symptomsdetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        SymptomsModel.findByIdAndUpdate(req.body.Symptoms_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.status(500).send("There was a problem updating the user.");
             res.json({Status:"Success",Message:"Symptomsdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      SymptomsModel.findByIdAndRemove(req.body.Symptoms_id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.json({Status:"Success",Message:"Symptoms Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;

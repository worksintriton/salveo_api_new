var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Patient = require('./../models/PatientModel');
var Doctor = require('./../models/DoctorModel');
var ComSpecialization = require('./../models/ComSpecializationModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());


router.post('/create', async function(req, res) {
  try{

        await ComSpecialization.create({
            ComSpecialization: req.body.ComSpecialization,
            ComSpecialization_image: req.body.ComSpecialization_image
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
        ComSpecialization.find({}, function (err, Specializationdetails) {
            res.json({Status:"Success",Message:"ComSpecializationdetails", Data : Specializationdetails ,Code:200});
        });
});



router.post('/edit', function (req, res) {
        ComSpecialization.findByIdAndUpdate(req.body.Specialization_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.status(500).send("There was a problem updating the user.");
             res.json({Status:"Success",Message:"ComSpecializationdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});




router.get('/deletes', function (req, res) {
      ComSpecialization.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Candidate Details Deleted", Data : {} ,Code:200});     
      });
});



// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      ComSpecialization.findByIdAndRemove(req.body.Specialization_id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.json({Status:"Success",Message:"Specialization Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;


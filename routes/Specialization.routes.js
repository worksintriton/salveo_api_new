var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Patient = require('./../models/PatientModel');
var Doctor = require('./../models/DoctorModel');
var Specialization = require('./../models/SpecializationModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());


router.post('/create', async function(req, res) {
  try{

        await Specialization.create({
          
            Specialization: req.body.Specialization,
		Specialization_image: req.body.Specialization_image
        }, 
       async function (err, user) {
        res.json({Status:"Success",Message:"Added successfully", Data : user,Code:200}); 
        });
}
catch(e){
      res.error(500, "Internal server error");
}
});



router.get('/deletes', function (req, res) {
      Specialization.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Candidate Details Deleted", Data : {} ,Code:200});
      });
});

router.get('/getlist_home', function (req, res) {
        Specialization.find({}, function (err, Specializationdetails) {
          res.json({Status:"Success",Message:"Specializationdetails", Data : Specializationdetails ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        Specialization.find({}, function (err, Specializationdetails) {
          var data = []
          for(let a = 0 ;  a < Specializationdetails.length ; a ++){
               if(Specializationdetails[a].Specialization == 'Doctor Consultation'){
               }else {
                data.push(Specializationdetails[a])
               }
               if(a == Specializationdetails.length - 1){
                 res.json({Status:"Success",Message:"Specializationdetails", Data : data ,Code:200});
               }
          }
        });
});









router.post('/edit', function (req, res) {
        Specialization.findByIdAndUpdate(req.body.Specialization_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.status(500).send("There was a problem updating the user.");
             res.json({Status:"Success",Message:"Specializationdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      Specialization.findByIdAndRemove(req.body.Specialization_id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.json({Status:"Success",Message:"Specialization Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;

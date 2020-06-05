var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Patient = require('./../models/PatientModel');
var Doctor = require('./../models/DoctorModel');
var family = require('./../models/FamilyModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());




router.post('/create', async function(req, res) {
  try{
        let request = req.body;
        console.log(request);
        let patientData = req.body.patientData;
        console.log("patient id in which the data is inserted", patientData);
         var lat = req.body.lat;
         var long = req.body.long;

        await family.create({
            Patient_id : req.body.patientData,
            Name: req.body.Name || "",
            Pic:req.body.Pic || "",
            Email_id: req.body.Email_id || "",
            LastName: req.body.LastName || "",
            Suffering_for: req.body.Suffering_for || "",
            Looking_doctor_like: req.body.Looking_doctor_like || "",
            Looking_doctor_specialisation: req.body.Looking_doctor_specialisation || "",
            Current_location: { 
                                  "type": "Point",
                                  "coordinates": [lat,long]
                                },
            DOB : req.body.DOB || "",
            Attach_documents: req.body.Attach_documents || "",
            Attach_prescription: req.body.Attach_prescription || "",
            Relation :req.body.Relation || "",
            Age: req.body.Age || "",
            Gender : req.body.Gender || "",
            BloodGroup : req.body.BloodGroup || "",
            ContactNumber:req.body.ContactNumber || "",
            Information: req.body.Information || "",
            height: req.body.height || "",
            weight: req.body.weight || "",


        }, 
       async function (err, user) {
        res.json({Status:"Success",Message:"Added successfully", Data : user,Code:200}); 
        });
}
catch(e){
      res.error(500, "Internal server error");
}
});


router.post('/getlist', function (req, res) {
        family.find({Patient_id:req.body.pid}, function (err, Familydetails) {
          res.json({Status:"Success",Message:"Familydetails", Data : Familydetails ,Code:200});
        });
});

router.post('/getlist_relation', function (req, res) {
        family.find({Patient_id:req.body.Patient_id}, function (err, Familydetails) {
          var data = [];
		  if(0 == Familydetails.length){
                 res.json({Status:"Success",Message:"Relation type List", Data : Familydetails ,Code:200});
           }
		console.log(Familydetails);
          for(var a = 0 ; a < Familydetails.length ; a ++){
               data.push({Relation_type : Familydetails[a].Relation});
               if(a == Familydetails.length - 1){
                 res.json({Status:"Success",Message:"Relation type List", Data : data ,Code:200});
               }
          }
        });
});


router.post('/edit', function (req, res) {
        family.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
                       res.json({Status:"Success",Message:"Update Successfully", Data : user,Code:200}); 

        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      family.findByIdAndRemove(req.body.pid, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.json({Status:"Success",Message:"Member Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;

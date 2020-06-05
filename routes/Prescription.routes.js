var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Patient = require('./../models/PatientModel');
var Doctor = require('./../models/DoctorModel');
var Prescription = require('./../models/PrescriptionModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());


router.post('/create', async function(req, res) {
  try{

        await Prescription.create({

            Doctor_Name : req.body.Doctor_Name, 
            Doctor_Image: req.body.Doctor_Image || "",
            Doctor_ID: req.body.Doctor_ID || "",
            Prescription_data: req.body.Prescription_data || "",
            Appointment_ID: req.body.Appointment_ID || "",
            Treatment_Done_by: req.body.Treatment_By || "",
            Patient_Name : req.body.Patient_Name || "",
            Patient_Image: req.body.Patient_Image || "",
            Patient_ID :req.body.Patient_ID || "",
            Family_ID : req.body.Family_ID || "",
            Family_Name: req.body.Family_Name || "",
            Family_Image: req.body.Family_Image || "",
            PDF_format : req.body.PDF_format || ""

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
      Prescription.find({Appointment_ID:req.body.Appointment_ID}, function (err, Prescriptiondetails) {
      res.json({Status:"Success",Message:"Prescriptiondetails", Data : Prescriptiondetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        Prescription.findByIdAndUpdate(req.body.Prescription_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.status(500).send("There was a problem updating the user.");
             res.json({Status:"Success",Message:"Prescriptiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      Prescription.findByIdAndRemove(req.body.Prescription_id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.json({Status:"Success",Message:"Prescription Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;

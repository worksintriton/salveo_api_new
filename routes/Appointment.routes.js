var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Patient = require('./../models/PatientModel');
var Doctor = require('./../models/DoctorModel');
var Appointment = require('./../models/AppointmentModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());


router.post('/create', async function(req, res) {
  try{

        await Appointment.create({

            Doctor_Name : req.body.Doctor_Name,
            Doctor_Image: req.body.Doctor_Image || "",
            Doctor_EmailId:req.body.Doctor_EmailId || "",
            Doctor_ID: req.body.Doctor_ID || "",
            Booking_Date: req.body.Booking_Date || "",
            Booking_Time: req.body.Booking_Time || "",
            Communication_Video: req.body.Communication_Video || "",
            Communication_Chat: req.body.Communication_Chat || "",
            Patient_Name : req.body.Patient_Name || "",
            Patient_EmailId: req.body.Patient_EmailId || "",
            Patient_Image: req.body.Patient_Image || "",
            Patient_ID :req.body.Patient_ID || "",
            Family_ID : req.body.Family_ID || "",
            Problem_info: req.body.Problem_info || "",
            Doc_attached: req.body.Doc_attached || "",
            Video_Chat_id : "",
            Msg_Chat_id :  "",
            passed_Medications: req.body.passed_Medications || ""

        }, 
       async function (err, user) {
         var data = {
          _id : user._id,
          Video_Chat_id : "https://meet.jit.si/" + user._id,
          Msg_Chat_id : "Meeting_id/"+user._id,
         }
          Appointment.findByIdAndUpdate(data._id, data, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.status(500).send("There was a problem updating the user.");
             // res.json({Status:"Success",Message:"Appointmentdetails Updated", Data : UpdatedDetails ,Code:200});
            res.json({Status:"Success",Message:"Added successfully", Data : user,Code:200});
        });
        });
}
catch(e){
      res.error(500, "Internal server error");
}
});

router.post('/check', async function(req, res) {
  try{

    await Appointment.findOne({Doctor_ID:req.body.Doctor_ID,Booking_Date:req.body.Booking_Date,Booking_Time:req.body.Booking_Time}, function (err, Appointmentdetails) {
          console.log(Appointmentdetails);
          if(Appointmentdetails!== null){
            res.json({Status:"Failed",Message:"Slot not Available",Data : {} ,Code:300});
          }
          else{
            res.json({Status:"Success",Message:"Available",Data : {} ,Code:200});
          }
          
        });
}
catch(e){
      res.error(500, "Internal server error");
}
});

router.post('/getlist/upcoming', function (req, res) {
  Appointment.find({Patient_ID:req.body.Patient_ID}, function (err, Appointmentdetails) {
        if(Appointmentdetails.length == 0){
                   res.json({Status:"Failed",Message:"No Appointments", Data : [] ,Code:300});
        }else{
        var Datasss = [];
         for(var a  = 0 ; a < Appointmentdetails.length ; a ++){
        var current_data = Appointmentdetails[a].Booking_Date;
        var string = current_data.split("-"); 
        var c_current_data = ""+string[2]+"-"+string[1]+"-"+string[0];
var GivenDate =   new Date(c_current_data);
var CurrentDate = new Date();
GivenDate = new Date(GivenDate);
if(GivenDate > CurrentDate){
    Datasss.push(Appointmentdetails[a]);
}else{
}
        if(a == Appointmentdetails.length - 1){
          res.json({Status:"Success",Message:"Appointmentdetails", Data : Datasss ,Code:200});
        }
         }  
}
        });
});



router.post('/getlist/pastappointment', function (req, res) {
  Appointment.find({Patient_ID:req.body.Patient_ID}, function (err, Appointmentdetails) {
        if(Appointmentdetails.length == 0){
                    res.json({Status:"Failed",Message:"No Appointments", Data : [] ,Code:300});
        }else{
        var Datasss = [];
         for(var a  = 0 ; a < Appointmentdetails.length ; a ++){
        var current_data = Appointmentdetails[a].Booking_Date;
        var string = current_data.split("-"); 
        var c_current_data = ""+string[2]+"-"+string[1]+"-"+string[0];
var GivenDate =   new Date(c_current_data);
var CurrentDate = new Date();
GivenDate = new Date(GivenDate);
if(GivenDate > CurrentDate){  
}else{
   Datasss.push(Appointmentdetails[a]);
}
        if(a == Appointmentdetails.length - 1){
          res.json({Status:"Success",Message:"Appointmentdetails", Data : Datasss ,Code:200});
        }
         }  
}
        });
});


router.get('/getlist', function (req, res) {
      Appointment.find({}, function (err, Appointmentdetails) {
      res.json({Status:"Success",Message:"Appointmentdetails", Data : Appointmentdetails ,Code:200});
        });
});


router.post('/getlist/docupcoming', function (req, res) {
  Appointment.find({Doctor_ID:req.body.Doctor_ID}, function (err, Appointmentdetails) {
        if(Appointmentdetails.length == 0){
                    res.json({Status:"Failed",Message:"No Appointments", Data : [] ,Code:300});
        }else{
        var Datasss = [];
         for(var a  = 0 ; a < Appointmentdetails.length ; a ++){
        var current_data = Appointmentdetails[a].Booking_Date;
        var string = current_data.split("-"); 
        var c_current_data = ""+string[2]+"-"+string[1]+"-"+string[0];
var GivenDate =   new Date(c_current_data);
var CurrentDate = new Date();
GivenDate = new Date(GivenDate);
if(GivenDate > CurrentDate){
    Datasss.push(Appointmentdetails[a]);
}else{
}
        if(a == Appointmentdetails.length - 1){
          res.json({Status:"Success",Message:"Appointmentdetails", Data : Datasss ,Code:200});
        }
         }  
}
        });
});



router.post('/getlist/docpastappointment', function (req, res) {
  Appointment.find({Doctor_ID:req.body.Doctor_ID}, function (err, Appointmentdetails) {
        if(Appointmentdetails.length == 0){
                    res.json({Status:"Failed",Message:"No Appointments", Data : [] ,Code:300});
        }else{
        var Datasss = [];
         for(var a  = 0 ; a < Appointmentdetails.length ; a ++){
        var current_data = Appointmentdetails[a].Booking_Date;
        var string = current_data.split("-"); 
        var c_current_data = ""+string[2]+"-"+string[1]+"-"+string[0];
var GivenDate =   new Date(c_current_data);
var CurrentDate = new Date();
GivenDate = new Date(GivenDate);
if(GivenDate > CurrentDate){  
}else{
   Datasss.push(Appointmentdetails[a]);
}
        if(a == Appointmentdetails.length - 1){
          res.json({Status:"Success",Message:"Appointmentdetails", Data : Datasss ,Code:200});
        }
         }  
}
        });
});


router.post('/edit', function (req, res) {
        Appointment.findByIdAndUpdate(req.body.Appointment_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.status(500).send("There was a problem updating the user.");
             res.json({Status:"Success",Message:"Appointmentdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      Appointment.findByIdAndRemove(req.body.Appointment_id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.json({Status:"Success",Message:"Appointment Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Doctor_time = require('./../models/Doctor_timeModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());
router.post('/create', function(req, res) {

	  var times = [];
 if(req.body.Time == 1){
    var a = {
    "Total_time_slot" : "12:00 AM - 03:00 AM"
  }
   times.push(a)
 }else if(req.body.Time == 2){
    var a = {
    "Total_time_slot" : "03:00 AM - 06:00 AM"
  }
   times.push(a)
 }else if(req.body.Time == 3){
    var a = {
    "Total_time_slot" : "06:00 AM - 09:00 AM"
  }
   times.push(a)
 }else if(req.body.Time == 4){
    var a = {
    "Total_time_slot" : "09:00 AM - 12:00 PM"
  }
   times.push(a)
 }else if(req.body.Time == 5){
    var a = {
    "Total_time_slot" : "12:00 PM - 03:00 PM"
  }
   times.push(a)
 }else if(req.body.Time == 6){
    var a = {
    "Total_time_slot" : "03:00 PM - 06:00 PM"
  }
   times.push(a)
 }else if(req.body.Time == 7){
    var a = {
    "Total_time_slot" : "06:00 PM - 09:00 PM"
  }
   times.push(a)
 }else if(req.body.Time == 8){
    var a = {
    "Total_time_slot" : "09:00 PM - 12:00 AM"
  }
   times.push(a)
 }


        Doctor_time.create({
          Doctor_name: req.body.Doctor_name,
          Doctor_email_id: req.body.Doctor_email_id,
          Doctor_ava_Date: req.body.Doctor_ava_Date,
          Time: times,
          Comm_type_chat: req.body.Comm_type_chat,
          Comm_type_video: req.body.Comm_type_video
        }, 
        function (err, user) {
          console.log(err)
          if (err) res.json({Status:"Failed",Message:"Failed to Insert", Data : {},Code:300});
          res.json({Status:"Success",Message:"Data Insert successfully", Data : {},Code:200});
        });
});



router.post('/doctor_date_avl', function (req, res) {
        Doctor_time.find({Doctor_email_id:req.body.Doctor_email_id,Doctor_ava_Date:req.body.Doctor_ava_Date}, function (err, Homebanners) {
            if (err) return res.status(500).send("There was a problem finding the Homebanners.");
               if(Homebanners.length == 0){
                     res.json({Status:"Failed",Message:"Doctor Not Available today Please select another Date", Data : Homebanners,Code:300});

                }else {
                  res.json({Status:"Success",Message:"Data List", Data : Homebanners,Code:200});
                }
        });
});



router.get('/getlist', function (req, res) {

        Doctor_time.find({}, function (err, Homebanners) {
            if (err) return res.status(500).send("There was a problem finding the Homebanners.");
                     res.json({Status:"Success",Message:"Data Insert successfully", Data : Homebanners,Code:200});
        });
});


router.post('/doctor_ava_all', function (req, res) {
        Doctor_time.find({Doctor_email_id:req.body.Doctor_email_id}, function (err, Homebanners) {
            if (err) return res.status(500).send("There was a problem finding the Homebanners.");
                     res.json({Status:"Success",Message:"Data List successfully", Data : Homebanners,Code:200});
        });
});

router.post('/edit', function (req, res) {
            console.log(req.body);
            Doctor_time.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
                              res.json({Status:"Success",Message:"Data updated successfully", Data : user,Code:200});
      
        });
});







// // DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {
      Doctor_time.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting details.");
          res.success(200, "Data Deleted Successfully");
      });
});

module.exports = router;

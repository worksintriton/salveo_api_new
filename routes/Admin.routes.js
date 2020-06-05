var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Patient = require('./../models/PatientModel');
var Doctor = require('./../models/DoctorModel');
var AdminUser = require('./../models/AdminUserModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());


router.post('/create', async function(req, res) {
  try{
      var email = req.body.Email_Id;
       var EmailCheck = await AdminUser.findOne({Email_Id:email});
        if(EmailCheck !== null){ 
           res.json({Status:"Failed",Message:"Email id already exists", Data : {},Code:300}); 
        }
        else{
        await AdminUser.create({
            Name: req.body.Name || "",
            Email_Id : req.body.Email_Id || "",
            Password: req.body.Password || "",
            Phone : req.body.Phone || "",
            Designation: req.body.Designation || "",
            CreatedBy: req.body.CreatedBy || "",
            UpdatedAt: req.body.UpdatedAt || "",
            ActiveStatus: req.body.ActiveStatus || "",
            Employee_Id : req.body.Employee_Id || "",
            Role_Id: req.body.Role_Id || "",
        }, 
       async function (err, user) {
        res.json({Status:"Success",Message:"Added successfully", Data : user,Code:200}); 
        });
      }
  }
catch(e){
      res.error(500, "Internal server error");
    }
});


router.post('/getlist', function (req, res) {
  
        AdminUser.find({}, function (err, AdminUserdetails) {
          res.json({Status:"Success",Message:"AdminUserdetails", Data : AdminUserdetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        AdminUser.findByIdAndUpdate(req.body.AdminUser_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.status(500).send("There was a problem updating the user.");
             res.json({Status:"Success",Message:"AdminUserdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      AdminUser.findByIdAndRemove(req.body.AdminUser_id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.json({Status:"Success",Message:"AdminUser Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var UserModel = require('./../models/UserModel');
var Doctor = require('./../models/DoctorModel');
var Patient = require('./../models/PatientModel');
var CompanyModel = require("./../models/CompanyModel");
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());


router.post('/register', async function(req, res) {
  try{
    console.log("request...",req.body)
    var email = req.body.Email;
    var name = req.body.Name;
    var phone = req.body.Phone;
     var type = req.body.Type;
     console.log("data_type",type);
     var logintype = req.body.Logintype;
     var checkData = await UserModel.findOne({Email:email,Type:type});
     var numberCheck = await UserModel.findOne({Phone:phone,Type:type});
     console.log("check value" ,checkData);
        if(numberCheck !== null){ 
            res.json({Status:"Failed",Message:"Account with this number already exists", Data : {},Code:300});
        }else if(checkData !== null){
           res.json({Status:"Failed",Message:"Email id already exists", Data : {},Code:300}); 
        }
        else{
          await UserModel.create({
                Name : req.body.Name || "",
                Email : req.body.Email || "",
                Password : req.body.Password || "",
                Type: type ,
                Phone : req.body.Phone || "",
                Logintype : logintype || "",
                UpdatedAt : req.body.UpdatedAt || "",
                Lastlogin:req.body.Lastlogin || "",
        }, 
          async function (err, user) {
            console.log(err);
          if (err) return res.json({Status:"Failed",Message:"There was a problem in registering. There again", Data : user,Code:300});
           if(type == 0){
              let fields= {
              "Pic":"",
              "Email" : req.body.Email,
              "Password" : req.body.Password,
              "Name":  req.body.Name,
              "Phone" : req.body.Phone,
              "Type": type,
              "LastName":"",
	      "Current_location":"",
              "Age":0,
              "Gender":"",
              "Address":"",
              "CorporateCode":"",
              "AvailableBalance":0,
              "PrepaidAmount":0,
              "Invoice":"",
              "Height":"",
              "Weight":"",
              "Suffering_for":"",
              "Looking_doctor_like":"",
              "Looking_doctor_specialisation":"",
              "Company":"",
              "Documents":"",
              "Attach_prescription":"",
              "About_me":"",
              "Update_date":req.body.UpdatedAt,
              "last_login_time":req.body.Lastlogin,
              "login_type":logintype,
              "corporatecode":""
            }
            var patientdetailsinsertion = await Patient.create(fields);
            var patientDetailsss = await Patient.findOne({Email:req.body.Email});
            console.log(patientDetailsss);
            res.json({Status:"Success",Message:"Patient registration successfully", Data : patientDetailsss,Code:200});
           }
           else{
            let fields= {
              "Pic":"",
              "Name" : req.body.Name,
              "DOB" : new Date(),
              "Languages":  [],
		    "Gender":req.body.Gender,
              "Email" : req.body.Email,
              "Password": req.body.Password,
              "Phone":req.body.Phone,
              "Qualifications":"",
              "HighestQualifications":"",
              "Year_of_Passout":new Date(),
              "Experience":0,
              "EmployeeAt":"",
		    "Current_location":"",
              "Current_employee_id":"",
              "AvailableHours":0,
              "Information":"",
              "login_type":logintype,
               "Update_date":req.body.UpdatedAt,
               "last_login_time":req.body.Lastlogin,
              "Available_type":"",
              "Service":[],
              "Special_mention":"",
              "Charge_Per_15min":"",
              "Type":type
            }
           var doctordetailsinsertion = await Doctor.create(fields);
           var DoctorsDetails = await Doctor.findOne({Email:req.body.Email});
          res.json({Status:"Success",Message:"Doctor registration successfully", Data : DoctorsDetails,Code:200});
        }
        });
        }
  }
     catch(e){
     res.json({Status:"Failed",Message:"Internal server issue", Data : {},Code:500});
     }
});



router.post('/login',  async function(req, res) {
      try{
    console.log("request...",req.body)
    var emailcheck = await UserModel.findOne({Email:req.body.Email,Password:req.body.Password});
    if(emailcheck == null){
     res.json({Status:"Failed",Message:"Invalid User Account", Data : {},Code:300});
    }else
    {
      console.log(emailcheck.Type);
      if(emailcheck.Type == 0){
        if(req.body.corporatecode == ""){
      var patientDetails = await Patient.findOne({Email:req.body.Email});
      patientDetails.corporatecode = req.body.corporatecode;
      res.json({Status:"Success",Message:"Patient Details", Data : patientDetails,Code:200});
        }
        else{
        var CorporateCodedata = await CompanyModel.findOne({Corporatecode:req.body.corporatecode});
        if(CorporateCodedata == null){
         res.json({Status:"Failed",Message:"Invalid User CorporateCode", Data : {},Code:300});
        }else{
          var patientDetails = await Patient.findOne({Email:req.body.Email});
          patientDetails.corporatecode = req.body.corporatecode;
          res.json({Status:"Success",Message:"Patient Details", Data : patientDetails,Code:200});
        }
        }
      } else {
       var DoctorsDetails = await Doctor.findOne({Email:req.body.Email});
        res.json({Status:"Success",Message:"Doctor Details", Data : DoctorsDetails,Code:200});
      }
    }
    }
     catch(e){
       res.json({Status:"Failed",Message:"Internal server issue", Data : {},Code:500});
     }
      });





router.post('/numberlogin',  async function(req, res) {
      try{
    console.log("request...",req.body)
    var emailcheck = await UserModel.findOne({Phone:req.body.Phone,Password:req.body.Password});
    if(emailcheck == null){
     res.json({Status:"Failed",Message:"Invalid User Account", Data : {},Code:300});
    }else
    {
      console.log(emailcheck.Type);
      if(emailcheck.Type == 0){
        if(req.body.corporatecode == ""){
      var patientDetails = await Patient.findOne({Phone:req.body.Phone});
      patientDetails.corporatecode = req.body.corporatecode;
      res.json({Status:"Success",Message:"Patient Details", Data : patientDetails,Code:200});
        }
        else{
        var CorporateCodedata = await CompanyModel.findOne({Corporatecode:req.body.corporatecode});
        if(CorporateCodedata == null){
         res.json({Status:"Failed",Message:"Invalid User CorporateCode", Data : {},Code:300});
        }else{
          var patientDetails = await Patient.findOne({Phone:req.body.Phone});
          patientDetails.corporatecode = req.body.corporatecode;
          res.json({Status:"Success",Message:"Patient Details", Data : patientDetails,Code:200});
        }
        }
      } else {
       var DoctorsDetails = await Doctor.findOne({Phone:req.body.Phone});
        res.json({Status:"Success",Message:"Doctor Details", Data : DoctorsDetails,Code:200});
      }
    }
    }
     catch(e){
       res.json({Status:"Failed",Message:"Internal server issue", Data : {},Code:500});
     }
});





router.post('/forgotpassword',  function(req, res) {
      UserModel.findOne({ Email: req.body.Email }, async function (err, user) {
        if (err) return res.error(500, "Internal server Error");
        if (!user){
         res.json({Status:"Failed",Message:"Invalid Email Id. Enter registered Email id", Data : {},Code:300});
        } else{     
        var passworddata = await UserModel.findOne({Email:req.body.Email}).select('Password');
        console.log(passworddata);
       var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'anjani513devi@gmail.com',
            pass: 'anjanichotu@24'
          }
        });

        var mailOptions = {
          to: req.body.Email,
          subject: 'Forgot password Mail',
          text: "Please check your password" + "<html><h1> passworddata.Password </h1></html> " + passworddata.Password,
      };
       transporter.sendMail(mailOptions, function(error, info){
          if (error) {
          console.log("erorr related the mail ", error);
          } else {
          console.log('Email sent: ' + info.response);
          }
        });
       res.json({Status:"Success",Message:"Password has been sent to the registered Email ID", Data : {},Code:200});
           }
      });
});


router.get('/getlist', function (req, res) {
        UserModel.find({}, function (err, users) {
            if (err) return res.error(500 , "There was a problem finding the Userslist.");
             res.success(200, "Userslist",users);        
        });
});


router.put('/edit/:id', function (req, res) {

        UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.success(200,"User updated successfully",user);
        });
});

// DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {

      UserModel.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
         res.success(200,"User Deleted successfully");
      });
});




router.post('/patientdetails', function (req, res) {
     var email = req.body.Email;
        Patient.findOne({Email:email}, function (err, users) {
            if (err) return res.error(500 , "There was a problem finding the Patientlist.");
             res.success(200, "patientdata", users);
        });
});




router.post('/familydetails', async function (req, res) {
  try{
     var email = req.body.Email;
    var familydetails = await Patient.findOne({Email:email}).populate('Family').select('Family');
    // res.success(200, "FamilyDetails",familydetails);
           res.json({Status:"Success",Message:"FamilyDetails", Data : familydetails,Code:200});
  }
  catch(e){
     res.error(500, "Internal server error");
  }
   
});
module.exports = router;

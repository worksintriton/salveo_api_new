var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Patient = require('./../models/PatientModel');
var Doctor = require('./../models/DoctorModel');
var Role = require('./../models/RoleModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());


router.post('/create', async function(req, res) {
  try{

        await Role.create({
            Designation: req.body.Designation || "",
            Role: req.body.Role || "",
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
  
        Role.find({}, function (err, Roledetails) {
          res.json({Status:"Success",Message:"Roledetails", Data : Roledetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        Role.findByIdAndUpdate(req.body.Role_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.status(500).send("There was a problem updating the user.");
             res.json({Status:"Success",Message:"Roledetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      Role.findByIdAndRemove(req.body.Role_id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.json({Status:"Success",Message:"Role Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
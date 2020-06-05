var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Doctor = require('./../models/DoctorModel');
var Company = require('./../models/CompanyModel');
const shortid = require('shortid');


router.post('/create', function (req, res) {
        var code = shortid.generate();
        console.log(code);
        Company.create({
         CompanyName: req.body.CompanyName,
         Corporatecode:code,
         Location :req.body.Location,
         Coverage:req.body.Coverage,
         Employees: req.body.Employees,
         ConsultantDoctors: req.body.ConsultantDoctors,
         DiscountOffered:req.body.DiscountOffered
        },
        function (err, user) {
          if (err) return res.status(500).send("There was a problem registering.");
          console.log(err)
          res.json({Status:"Success",Message:"", Data : {},Code:200});
           // res.success(200, "Details Inserted Successfully",user);
        });
});



router.get('/getlist', function (req, res) {
        Company.find({}, function (err, Companydetails) {
            if (err) return res.status(500).send("There was a problem finding the Doctors.");
          res.json({Status:"Success",Message:"Data List successfully", Data : Companydetails,Code:200});
        });
});





// router.get('/viewData/:id', VerifyToken, function (req, res) {
//       User.findById(req.params.id, function (err, user) {
//           if (err) return res.status(500).send("There was a problem finding the user.");
//           if (!user) return res.status(404).send("No user found.");
//           res.status(200).send(user);
//       });
// });

// router.put('/edit/:id',VerifyToken, function (req, res) {
//         User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
//             if (err) return res.status(500).send("There was a problem updating the user.");
//             res.status(200).send(user);
//         });
// });
// // DELETES A USER FROM THE DATABASE
// router.delete('/delete/:id',VerifyToken, function (req, res) {
//       User.findByIdAndRemove(req.params.id, function (err, user) {
//           if (err) return res.status(500).send("There was a problem deleting the user.");
//           res.status(200).send("User: "+ user.name +" was deleted.");
//       });
// });

module.exports = router;
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Msgchat = require('./../models/MsgchatModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());


router.post('/create', async function(req, res) {
  try{
        await Msgchat.create({
  User_id: req.body.User_id || "",
  User_name: req.body.User_name || "",
  User_email_id: req.body.User_email_id || "",
  User_pic: req.body.User_pic || "",
  User_text : req.body.User_text || "",
  User_image: req.body.User_image || "",
  User_type: req.body.User_type || "",
  Update_date : req.body.Update_date || "",
  Msgchat_ID  : req.body.Msgchat_ID || "",
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
      Msgchat.find({Msgchat_ID:req.body.Msgchat_ID}, function (err, Prescriptiondetails) {
      res.json({Status:"Success",Message:"Msgchatdetails", Data : Prescriptiondetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        Msgchat.findByIdAndUpdate(req.body.Prescription_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.status(500).send("There was a problem updating the user.");
             res.json({Status:"Success",Message:"Msgchatdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      Msgchat.findByIdAndRemove(req.body.Prescription_id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.json({Status:"Success",Message:"Msgchat Deleted successfully", Data : {} ,Code:200});
      });
});

module.exports = router;


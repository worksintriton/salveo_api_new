var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var FamilySchema = new mongoose.Schema({  
  
  Patient_id: String,
  Name: String,

  Pic: String,

  Email_id: String,

  LastName: String,

  Suffering_for: String,

  Looking_doctor_like: String,

  Looking_doctor_specialisation: String,

  Current_location:{

   type: { type: String },
   coordinates: []
  },
  
  DOB : String,

  Attach_documents: String,

  Attach_prescription: String,
  
  Relation :String,

  height: Number,

  weight: Number,

  Age: Number,
  
  Gender : String,

  BloodGroup : String,
  
  ContactNumber:Number,

  Coverage: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
  Information: String,
 
});
mongoose.model('Family', FamilySchema);

module.exports = mongoose.model('Family');
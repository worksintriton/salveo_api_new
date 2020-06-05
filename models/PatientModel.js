var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var PatientSchema = new mongoose.Schema({  
  
  
  Pic : String,


  Name: String,
  
  LastName : String,
  
  Email:{

  	type: String,
  },

  Type : Number,

  Age: Number,

  Gender : String,

  Password: String,
  
  Address: String,
  
  Phone: String,

  CorporateCode: String,

  AvailableBalance: Number,

  PrepaidAmount: Number,

  Invoice: String,

  Height : String,


  Weight : String,

  Suffering_for: String,

  Looking_doctor_like: String,

  Looking_doctor_specialisation: String,

    Current_location:String,
  Family:{  

       type: Schema.Types.ObjectId,
       ref: 'Family',
     
      },

      Payment:{  

       type: Schema.Types.ObjectId,
       ref: 'Payment',
     
      },

  Company: String,

  Documents: String,
  
  Attach_prescription: String,

  About_me: String,

  Update_date: String,

  last_login_time: String,

  login_type: String,

   corporatecode: String,
 
});
mongoose.model('Patient', PatientSchema);

module.exports = mongoose.model('Patient');

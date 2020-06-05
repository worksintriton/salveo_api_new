var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var DoctorSchema = new mongoose.Schema({  
  
  Pic : String,

  Name: String,
  
  DOB : String,

  Type : Number,
  
	 Gender: String,
  Languages: Array,

  Email: String,
  
  Password : String,
  
  Phone:String,

  Qualifications : String,

  HighestQualifications: String,

  Specilization: Array,
  
  Year_of_Passout: String,
  
  Experience: String,
  
  Current_location:String,

  EmployeeAt: String,

  Current_employee_id: String,

  AvailableHours: String,

  OnlineConsultant: {

        type: Number,
        enum: [0, 1],
        default: 0,
    }
    ,
    Information: String,

    login_type: String,

    Updated_At: String,

    last_login_time : String,

    Available_type : String,

    Service: Array,

    Special_mention: String,

    Charge_Per_15min: String,

    File_list: Array,

	  signature:String,

    
});
mongoose.model('Doctor', DoctorSchema);

module.exports = mongoose.model('Doctor');

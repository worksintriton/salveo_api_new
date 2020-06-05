var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var AppointmentSchema = new mongoose.Schema({  
 
  Doctor_Name: String,

  Doctor_Image: String,

  Doctor_EmailId: String,

  Doctor_ID: String,

  Booking_Date: String,

  Booking_Time: String,

 Communication_Video: String,

  Communication_Chat : String,

  Patient_Name: String,

  Patient_EmailId: String,
  
  Patient_Image :String,

  Patient_ID: String,

  Family_ID : String,

  Problem_info: String,
  Booking_for : String,

  Member_id : String,
  Doc_attached: Array,

	  Video_Chat_id : String,

  Msg_Chat_id :  String,
  passed_Medications: String,


});
mongoose.model('Appointment', AppointmentSchema);

module.exports = mongoose.model('Appointment');

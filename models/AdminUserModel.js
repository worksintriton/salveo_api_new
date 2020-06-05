var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var AdminUserSchema = new mongoose.Schema({  
  
  
  Name: String,

  Email_Id:{

  	type: String,
  },

  Password: String,
  
  Phone: Number,
  
  Designation: {

    type: String,
  },

  CreatedBy: String,

  UpdatedAt : String,

  ActiveStatus: Number,

  Employee_Id : String,

  Role_Id  : String,

});
mongoose.model('AdminUser', AdminUserSchema);

module.exports = mongoose.model('AdminUser');
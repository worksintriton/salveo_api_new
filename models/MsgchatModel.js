var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var MsgchatSchema = new mongoose.Schema({  
  
  
  User_id: String,

  User_name: String,
  
  User_email_id: String,

  User_pic: String,

  User_text : String,

  User_image: String,

  User_type: String,

  Update_date : String,

  Msgchat_ID  : String,

});
mongoose.model('Msgchat', MsgchatSchema);

module.exports = mongoose.model('Msgchat');

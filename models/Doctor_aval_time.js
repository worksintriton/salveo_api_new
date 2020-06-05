var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var DoctoravalableSchema = new mongoose.Schema({  
  Image_icon: String,
  Name_of_the_type: String,

});
mongoose.model('Doctor_available', DoctoravalableSchema);

module.exports = mongoose.model('Doctor_available');
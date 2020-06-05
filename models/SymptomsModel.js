var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var SymptomsSchema = new mongoose.Schema({  

  Specializations: {

    type: Array,
  },
  Symptoms_Shown:
  {
  	type:String,
  } 
  ,
  Symptoms_image:
  {
  	type:String,
  } 
});
mongoose.model('Symptoms', SymptomsSchema);

module.exports = mongoose.model('Symptoms');
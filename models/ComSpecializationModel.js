var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var ComSpecializationSchema = new mongoose.Schema({  

  ComSpecialization: {

    type: String,
  },
    ComSpecialization_image:
  {
  	type:String,
  } 

});
mongoose.model('ComSpecialization', ComSpecializationSchema);

module.exports = mongoose.model('ComSpecialization');

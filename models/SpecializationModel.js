var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var SpecializationSchema = new mongoose.Schema({  

  Specialization: {

    type: String,
  },
    Specialization_image:
  {
  	type:String,
  } 

});
mongoose.model('Specialization', SpecializationSchema);

module.exports = mongoose.model('Specialization');

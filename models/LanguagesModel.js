var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var LanguagesSchema = new mongoose.Schema({  

  Languages: {

    type: String,
  },

});
mongoose.model('Language', LanguagesSchema);

module.exports = mongoose.model('Language');

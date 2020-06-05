var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var RoleSchema = new mongoose.Schema({  

  Designation: {

    type: String,
  },

  Role  : Array,

});
mongoose.model('Role', RoleSchema);

module.exports = mongoose.model('Role');
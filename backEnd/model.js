var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {type: String},
  place: {type: String},
  qualification : {type: String},
  jobType: {type: String},
  referrer: {type: String}
});

module.exports = mongoose.model('User', userSchema, 'myDoc');

var db = require('../config/db.js');
var userSchema = require('./userschema');

var User = db.model('users', userSchema);

module.exports = User;
var db = require('../config/db.js');

var userSchema = db.Schema({
	username: {type: String, require: true},
	active: {type: String, require: true},
	admin: {type: String, require:true},
	passhash:{type:String, require: true}
});

module.exports = userSchema;
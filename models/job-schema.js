var db = require('../config/db.js');

var JobSchema = db.Schema({
	Date: {type: Date, require: true},
	Job: {type: String, require: true},
	Photographer: String,
	Rate: Number,
	Split: String,
	Accepted: String,
	acceptedDate: Date,
	Accreditation: String
});

module.exports = JobSchema;
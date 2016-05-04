var db = require('../config/db');
var JobSchema = require('./job-schema');
var Job = db.model('Jobs', JobSchema);

module.exports = Job;
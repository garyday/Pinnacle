var router = require('express').Router();
var Job = require('../models/job');
var moment = require('moment');
var User = require('../models/user');

router.get('/', function(req, res) {
	if (req.user !== undefined) {
		res.send('off');
	} else {
		res.status(401).send('Not Authorized');
	}
});





module.exports = router;
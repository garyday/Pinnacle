var jwt = require('jsonwebtoken');
var User = require('../models/user');
var constant = require('../config/constant');


module.exports = function(req, res, next) {
	var sessionToken = req.query.token;
	if (!req.body.user && sessionToken) {
		jwt.verify(sessionToken, constant.JWT_SECRET, function(err, decodedID) {
			if (decodedID) {
				User.findOne({
					_id: decodedID.user.id
				}).then(function(user) {
						req['user'] = user;
					next();
				}, function(err) {
					res.status(401).send(err);
				});
			} else {
				res.status(401).send('Not Authorized - No decodedID');
			}
		});
	} else {
		next();
	}
};
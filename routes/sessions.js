var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var constant = require('../config/constant');
var User = require('../models/user');

router.post('/', function(req, res) {

	console.log(req.body);

	User.findOne({
		username: req.body.username
	}).then(function(user) {
			if (user) {
				bcrypt.compare(req.body.password, user.passhash, function(err, matches) {
					if (matches) {
						var sessionToken = jwt.sign({
								user: {
									id: user._id
								}
							},
							constant.JWT_SECRET, {
								expiresIn: 60 * 60
							});
						// SUCESSFULL LOGIN
						res.redirect('/api/jobs?token=' + sessionToken);
						// res.json({
						// 	user: user,
						// 	message: 'Sucessfully Authorized',
						// 	sessionToken: sessionToken
						// });
					} else {
						res.json({
							user: {},
							message: 'Failed to Authorize',
							sessionToken: ''
						});
					}
				});
			} else {
				res.json({
					user: {},
					message: 'Failed to Authorize',
					sessionToken: ''
				});
			}
		},
		function(err) {
			// Could not find user
			res.json(err);
		});
});

module.exports = router;
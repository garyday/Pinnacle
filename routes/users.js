var router = require('express').Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var constant = require('../config/constant');

router.post('/', function(req,res){
	var user = new User({
		username: req.body.user.username,
		active: req.body.user.active,
		admin: req.body.user.admin,
		passhash: bcrypt.hashSync(req.body.user.password,10)
	});

	user.save().then(function(newUser){
		console.log(newUser);
		var sessionToken = jwt.sign(newUser, constant.JWT_SECRET);
		res.json({
			user: newUser,
			message: 'success',
			sessionToken: sessionToken
		});
	}, function(err){
		res.send(500, err.message);
	});

});

module.exports = router;
var router = require('express').Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var constant = require('../config/constant');



router.post('/', function(req,res){
	var user = new User({
		username: req.body.username,
		active: req.body.active,
		admin: req.body.administrator,
		passhash: bcrypt.hashSync(req.body.password,10)
	});

	user.save().then(function(newUser){
		var sessionToken = jwt.sign(newUser, constant.JWT_SECRET);
		// NEW USER ADDED - SEND RESPONCE
		res.redirect('/api/users?token=' + req.query.token);
	}, function(err){
		res.send(500, err.message);
	});

});

router.get('/', function(req, res) {
	if (req.user !== undefined) {
		if (req.user.admin === "no") {
			return res.status(401).send('Not Authorized');
		}
		User.find().sort({username: 'ascending'}).then(function(users) {
			//DISPLAY JOBS JADE FILE
			res.render('users', {users: users, user: req.user.username, token: req.query.token});
		}, function(err) {});
	} else {
		res.status(401).send('Not Authorized');
	}
});

router.get('/add', function(req, res) {
	if (req.user !== undefined) {
		if (req.user.admin === "no") {
			return res.status(401).send('Not Authorized');
		}
		res.render('useradd', {
			user: req.user.username,
			token: req.query.token,
		});
	} else {
		res.status(401).send('Not Authorized');
	}
});

//delete a User
router.delete('/:id', function(req, res) {
	if (req.user !== undefined) {
		User.findOne({
			_id: req.params.id
		}).then(function(User) {
			User.remove().then(function() {
				res.send('User Deleted! Please refresh your page');
			});
		});
	} else {
		res.status(401).send('Not Authorized');
	}
});


module.exports = router;
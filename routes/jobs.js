var router = require('express').Router();
var Job = require('../models/job');
var moment = require('momentjs');
var User = require('../models/user');


//get all jobs by user
router.get('/', function(req, res) {
	if (req.user !== undefined) {
		var photographer = {}
		if (req.user.admin === "no") {
			photographer = {
				Photographer: req.user.username
			}
		}
		Job.find(photographer).sort({
			Date: 'ascending'
		}).then(function(jobs) {
			//DISPLAY JOBS JADE FILE
			res.render('jobs', {
				jobs: jobs,
				user: req.user.username,
				token: req.query.token
			});
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
		User.find().sort({
			username: 'ascending'
		}).then(function(photographers) {
			res.render('jobadd', {
				user: req.user.username,
				token: req.query.token,
				photographers: photographers,
			});
		});
	} else {
		res.status(401).send('Not Authorized');
	}
});


//create new Job
router.post('/', function(req, res) {
	if (req.user !== undefined) {
		var def = new Job({
			Date: moment(req.body.date),
			Job: req.body.job,
			Photographer: req.body.photographer,
			Rate: req.body.rate,
			Split: req.body.split,
			Accepted: req.body.accepted,
			Accreditation: req.body.accreditation
		})
		def.save().then(function(Job) {
			//JOB SAVED - REDIRECT TO JOBS PAGE
			res.redirect('/api/jobs?token=' + req.query.token);
		});
	} else {
		res.status(401).send('Not Authorized');
	}
});

//get job by ID
router.get('/:id', function(req, res) {
	if (req.user !== undefined) {
		Job.findOne({
			_id: req.params.id
		}).then(function(Job) {
			//JOB FOUND, RENDER JADE FILE
			res.render('jobedit', {
				user: req.user.username,
				token: req.query.token,
				job: Job,
				id: req.params.id
			});
		});
	} else {
		res.status(401).send('Not Authorized');
	}
});

//update an existing Job
router.post('/:id', function(req, res) {
	Job.findOne({
		_id: req.params.id
	}).then(function(Job) {
		Job.Date = req.body.date;
		Job.Job = req.body.job;
		Job.Photographer = req.body.photographer;
		Job.Rate = req.body.rate;
		Job.Split = req.body.split;
		Job.Accepted = req.body.accepted;
		Job.Accreditation = req.body.accreditation;
		Job.save().then(function(Job) {
			//REDIRECT BACK TO JOBS PAGE WHEN SUBMIT IS HIT
			res.redirect('/api/jobs?token=' + req.query.token);
		});
	});
});

//delete a Job
router.delete('/:id', function(req, res) {
	if (req.user !== undefined) {
		Job.findOne({
			_id: req.params.id
		}).then(function(Job) {
			Job.remove().then(function() {
				res.send('Job Deleted! Please refresh your page');
			});
		});
	} else {
		res.status(401).send('Not Authorized');
	}
});

module.exports = router;
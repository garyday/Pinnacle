var router = require('express').Router();
var Job = require('../models/job');
var moment = require('moment');
var User = require('../models/user');


//get all jobs by user
router.get('/', function(req, res) {
	if (req.user !== undefined) {
		// Add in From and To Date for Search
		if (!req.query.dateFrom) {
			fromDate = moment()._d
			toDate = moment(fromDate).add(3, 'months')._d
		} else {
			fromDate = moment(req.query.dateFrom, 'DD-MM-YY')
			toDate = moment(req.query.dateTo, 'DD-MM-YY')
		}
		var searchParams = {
				Date: {
					'$gte': fromDate,
					'$lt': toDate
				}
			}
			// Add USERNAME if the logged in user is not an Administrator, otherwise leave blank
		if (req.user.admin === "no") {
			searchParams.Photographer = req.user.username
		}
		Job.find(searchParams).sort({
			Date: 'ascending'
		}).then(function(jobs) {
			//DISPLAY JOBS JADE FILE
			res.render('jobs', {
				jobs: jobs,
				user: req.user,
				token: req.query.token,
				dateRange: {
					from: moment(fromDate).format("DD-MM-YY"),
					to: moment(toDate).format("DD-MM-YY"),
				}
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
		if (req.user.admin === "no") {
			return res.status(401).send('Not Authorized');
		}
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
	if (req.user !== undefined) {
		if (req.user.admin === "no") {
			return res.status(401).send('Not Authorized');
		}
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
	} else {
		res.status(401).send('Not Authorized');
	}
});

//Accept a Job
router.post('/accept/:id', function(req, res) {
	if (req.user !== undefined) {
		Job.findOne({
			_id: req.params.id
		}).then(function(Job) {
			if (req.user.username === Job.Photographer) {
			Job.Date = Job.Date;
			Job.Job = Job.Job;
			Job.Photographer = Job.Photographer;
			Job.Rate = Job.Rate;
			Job.Split = Job.Split;
			Job.Accepted = 'Yes';
			Job.Accreditation = Job.Accreditation;
				Job.save().then(function(Job) {
					//REDIRECT BACK TO JOBS PAGE WHEN SUBMIT IS HIT
					res.redirect('/api/jobs?token=' + req.query.token);
				});
			} else {
				res.status(401).send('Not Authorized');
			}
		});
	} else {
		res.status(401).send('Not Authorized');
	}
});

//delete a Job
router.delete('/:id', function(req, res) {
	if (req.user !== undefined) {
		if (req.user.admin === "no") {
			return res.status(401).send('Not Authorized');
		}
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
var router = require('express').Router();
var Job = require('../models/job');
var moment = require('momentjs');


//get all jobs by user
router.get('/', function(req, res) {
	if (req.user !== undefined) {
		var photographer = {}
		if (req.user.admin === "no") {
			photographer = {
				Photographer: req.user.username
			}
		}
		Job.find(photographer).sort({Date: 'ascending'}).then(function(jobs) {
			//DISPLAY JOBS JADE FILE
			res.render('jobs', {jobs: jobs, user: req.user.username});
		}, function(err) {});
	} else {
		res.status(401).send('Not Authorized');
	}
});

//create new Job
router.post('/', function(req, res) {
	var def = new Job({
		Date: req.body.Date,
		Job: req.body.Job,
		Photographer: req.body.Photographer,
		Rate: req.body.Rate,
		Split: req.body.Split,
		Accepted: req.body.Accepted,
		acceptedDate: req.body.acceptedDate,
		Accreditation: req.body.Accreditation
	})

	def.save().then(function(Job) {
		res.json({
			message: 'Job Added',
			Job: Job
		});
	});
});

//update an existing Job
router.put('/:id', function(req, res) {
	Job.findOne({
		_id: req.params.id
	}).then(function(Job) {
		Job.Date = req.body.date;
		Job.job = req.body.job;
		Job.Photographer = req.body.photographer;
		Job.Rate = req.body.rate;
		Job.Split = req.body.split;
		Job.Accepted = req.body.accepted;
		Job.AcceptedDate = req.body.acceptedDate;
		Job.Accreditation = req.body.accreditation;
		Job.save().then(function(Job) {
			res.json({
				message: 'Job Updated',
				Job: Job
			})
		});
	}, function(err) {

	});
});

//delete a Job
router.delete('/:id', function(req, res) {
	Job.findOne({
		_id: req.params.id
	}).then(function(Job) {
		Job.remove().then(function() {
			res.json({
				message: 'Job Deleted!',
				Job: Job
			});
		});
	});
});

module.exports = router;
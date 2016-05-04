var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('momentjs');

app.use('/test', function(req, res) {
	res.render('view', {
		title: 'Welcome '
	});
});

app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());
app.locals.moment = require('momentjs');

app.use(require('./middleware/headers.js'));

app.use(require('./middleware/validate-session'));

app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/sessions'));
app.use('/api/jobs', require('./routes/jobs'));


app.listen(3000, function() {
	console.log('App is listening on port 3000');
});
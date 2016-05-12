var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('momentjs');


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

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.listen(PORT, function() {
	console.log('App now running');
});
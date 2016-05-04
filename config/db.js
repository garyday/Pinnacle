var db = require('mongoose');

db.connect('mongodb://heroku_7mxq4qxz:9kec2q2e5luon0vpqeli4rric9@ds013848.mongolab.com:13848/heroku_7mxq4qxz');

module.exports = db;
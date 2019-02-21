var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

var index = require('./routes/index');
const api = require('./routes/api/index');

// var users = require('./routes/users');

var app = express();

mongoose.Promise = global.Promise;

// Adds connection to database using mongoose
// for <dbuser>: replace with your username, 
// <dbpword> replace with your pword.
// <DATABASE_URL>: replace with database url,

mongoose.connect('mongodb://josephsebastian:Luy-gWJ-Fp8-ue5@ds257858.mlab.com:57858/appointments');

// this enabled CORS, cross-origin resource sharing is a mechanism 
// that allows restricted resources on a web page to be requested 
// from another domain outside the domain from which the resource
// was originally requested

app.all('/*', function (req, res, next) {
	// CORS headers
	res.header("Access-Control-Allow-Origin", "*");
	// restrict it to the required domain
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
	// set custom header for CORS
	res.header("Access-Control-Allow-Headers", "Content-type, Accept, X-Access-Token, X-Key");

	if (req.method == "OPTIONS") 
	{
		res.status(200).end();
	}
	else 
	{
		next();
	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

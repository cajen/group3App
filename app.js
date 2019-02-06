var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var instrRouter = require('./routes/instruments');
var mongoose = require('mongoose');

// connect to a mongodb db hosted on mongolab with mongoose
mongoose.connect('mongodb://cajen:TMbqdz5eMpLshdV@ds123635.mlab.com:23635/gp3db', {useNewUrlParser: true});
// This is the db reference
var db = mongoose.connection;

// Test to see if db is connected ... and it is

// db.collection('inventory').insertOne({
//   item: 'canvas',
//   qty: 100,
//   tags: ['cotton'],
//   size: { h: 28, w: 35.5, uom: 'cm' }
// });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/instruments', instrRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

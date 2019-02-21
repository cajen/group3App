var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var instrRouter = require('./routes/instruments');
var recordRouter = require('./routes/recordings');
var profileRouter = require('./routes/profile');
var helpRouter = require('./routes/help');
var loginRouter = require('./routes/login');
var instPageRouter = require('./routes/instPage');
var recordingPageRouter = require('./routes/recordingPage');
var testPageRouter = require('./routes/test');
var test2PageRouter = require('./routes/test2');
var homePageRouter = require('./routes/home');
var deleteR = require('./routes/delRec');
var hbs = require('hbs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/instruments', instrRouter);
app.use('/recordings', recordRouter);
app.use('/profile', profileRouter);
app.use('/help', helpRouter);
app.use('/login', loginRouter);
app.use('/instPage', instPageRouter);
app.use('/recordingPage', recordingPageRouter);
app.use('/test', testPageRouter);
app.use('/test2', test2PageRouter);
app.use('/home', homePageRouter);
app.use('/addUser', indexRouter.addUser);

app.get('/recordings/delete', deleteR.deleteRec);
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

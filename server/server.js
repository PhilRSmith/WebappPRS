var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var MongoClient = require('mongodb').MongoClient
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var awsCtrl = require("./awsCtrl");
var cors = require('cors');

var adminLoginCredentials = 'mongodb+srv://PRSmith:Ocelot2893!@418term-ham3w.mongodb.net/test?retryWrites=true&w=majority'
var app = express();

var portDev = process.env.port || 9000
var portPub = process.env.port || 8080

require('dotenv').config();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(portDev, () => console.log(`Listening on port ${portDev}`));
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/sign_s3', awsCtrl);
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

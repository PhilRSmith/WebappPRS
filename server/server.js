var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var awsCtrl = require("./routes/awsCtrl");
var cors = require('cors');
var express = require('express');
var app = express();
var mongoose = require("mongoose");
require('dotenv').config();

//var SecretPayload=process.env.SecretPayload
var portDev = process.env.port || 9000
//var portPub = process.env.port || 8080

var allowedOrigins = ['http://localhost:9000',
                      'http://localhost:3000',
                      'https://webcomicpages.s3.us-east-2.amazonaws.com',
                      'http://ec2-3-21-56-228.us-east-2.compute.amazonaws.com'
                      ];



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(portDev, () => console.log(`Listening on port ${portDev}`));
app.use(logger('dev'));
app.use(cors({
    credentials: true ,
    origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  } 
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var mongooseSetup = async () => {
  var adminLoginCredentials=process.env.DBAccess
  try {
    await mongoose.connect(adminLoginCredentials,  {
      useNewUrlParser: true,
      useUnifiedTopology : true 
    });
    console.log("DB Request made");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

mongooseSetup()

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

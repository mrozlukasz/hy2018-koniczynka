var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var body_parser = require('body-parser');
var request = require('request');
var config = require('./config/config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var webhookRouter = require('./routes/webhook');

var imageProcessing = require('./image-processing/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(body_parser.json());
app.use(express.static(path.join(__dirname, 'public')));


//Connecting MongoDB using mongoose to our application
mongoose.connect(config.db);

//This callback will be triggered once the connection is successfully established to MongoDB
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.db);
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/webhook', webhookRouter);

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

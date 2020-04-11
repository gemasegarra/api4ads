var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// database connection

require('./lib/mongooseConnection');


// view engine setup
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API routes

app.use('/apiv1/ads', require('./routes/APIv1/ads'))
app.use('/apiv1/tags', require('./routes/APIv1/tags'))

// Website routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    if (err.array) { 
      err.status = 422;
      const errInfo = err.array({ onlyFirstError: true })[0];
      err.message = APIRequest(req) ?
        { message: 'Not valid', errors: err.mapped()}
        : `Param ${errInfo.param} ${errInfo.msg}`;
    }
  
    res.status(err.status || 500);
  
    if (APIRequest(req)) {
      res.json({ error: err.message });
      return;
    }
  
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function APIRequest(req) {
  return req.originalUrl.startsWith('/apiv1/');
}



module.exports = app;

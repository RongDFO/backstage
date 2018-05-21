var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var jwt    = require('jsonwebtoken'); // 使用jwt签名


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var testRouter = require('./routes/test');
var loginRouter = require('./routes/login');

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.set('superSecret', 'myscri'); 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.use('/test', testRouter);


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
  res.render(err);
});

module.exports = app;

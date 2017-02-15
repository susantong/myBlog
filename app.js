var express = require('express');
var path = require('path');
/*加入mongo*/
var session = require('express-session');
var connect = require('connect');
var MongoStore = require('connect-mongo')(session);
//var config = require('./settings');
//var mongoose
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var ejs = require('ejs');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://localhost/test?poolSize=40');

var app = express();

app.use(session({
   secret:'12345',
   name: 'susan',
   cookie:{maxAge:1000*60*60*24*30},
   resave: false,
   saveUninitialized: true,
   store:new MongoStore({
  	 url: 'mongodb://localhost/test?poolSize=40',
  	 ttl: 14 * 24 * 60 * 60
  })
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));

//将ejs模板设置为html，方便书写
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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

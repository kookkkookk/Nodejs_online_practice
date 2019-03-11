var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var auth = require('./routes/auth');
require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  //cookie: {  maxAge: 100 * 1000 }
}))
app.use(flash());

const authChecker = (req, res, next) => {
  console.log('middleware', req.session);
  //指定的uid才可以登入
  //if (req.session.uid === process.env.ADMIN_UID) {
  //  return next();
  //}

  //只要是會員都可以登入
  if(req.session.uid){
    return next();
  }
  
  return res.redirect('/auth/signin');
}
app.use('/auth', auth);
app.use('/', indexRouter);
app.use('/dashboard', authChecker, dashboardRouter);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('error',{
    title: '您所查看的頁面不存在 :('
  })
});

//error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');//載入express
var path = require('path');//載入path
var cookieParser = require('cookie-parser');//載入cookie 解析
var logger = require('morgan');//載入log 日誌輸出

var indexRouter = require('./routes/index');//內建兩頁routes pages
var usersRouter = require('./routes/users');

var app = express();//使用express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));//使用ejs template
app.set('view engine', 'ejs');

app.use(logger('dev'));//紀錄log
app.use(express.json());//解析傳入json格式
app.use(express.urlencoded({ extended: false }));//解析傳入字串格式
app.use(cookieParser());//解析cookie
app.use(express.static(path.join(__dirname, 'public')));//設定靜態載入路徑

app.use('/', indexRouter);//routes pages
app.use('/users', usersRouter);

// catch 404 and forward to error handler
//設定404 500 error頁面
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

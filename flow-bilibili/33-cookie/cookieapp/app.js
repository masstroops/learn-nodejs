var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// express视图设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// express中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// dssed 开启加密
app.use(cookieParser('dssed'));
app.use(express.static(path.join(__dirname, 'public')));

// 路由匹配
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// 设置404页面的中间件
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// 处理错误的中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

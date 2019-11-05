var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var autenticationsRouter = require('./routes/autentication');
var adminRouter = require('./routes/admin');
var productosRouter = require('./routes/productos');

var app = express();

//Definicion de secretKey
app.set('secretKeyUsuarios', process.env.SECRET_KEY_USUARIOS);
app.set('secretKeyAdmin', process.env.SECRET_KEY_ADMIN);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** HEADER INICIO */
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
  next();
});
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token');
  res.send(200);
});
/** HEADER FIN */

app.use('/', indexRouter);
app.use('/users', validateUsuario, usersRouter);
app.use('/autentication', autenticationsRouter);
app.use('/admin', validateAdmin, adminRouter);
app.use('/productos', productosRouter);

function validateUsuario(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKeyUsuarios'), function (err, decoded) {
    if (err) {
      if(err.name=='TokenExpiredError') res.status(401).json({status:"error", message: err.message, data:null});
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}

function validateAdmin(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKeyAdmin'), function (err, decoded) {
    if (err) {
      if(err.name=='TokenExpiredError') res.status(401).json({status:"error", message: err.message, data:null});
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });

}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

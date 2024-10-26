var createError = require('http-errors');
var express = require('express');
var Handlebars = require('handlebars');
var exphbs = require('express-handlebars')
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParse = require('body-parser');
var logger = require('morgan');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(cookieParser());

// Motor visual
app.set('views', path.join(__dirname, 'views'));
var hbs = exphbs.create({
  defaultLayout: 'index',
  partialsDir: path.join(app.get('views'), 'partials'),
  feedDir: path.join(app.get('views'), 'feed'),
  extname: '.hbs',
});
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Rutas
var assets = require("./routes/assets");
app.use("/assets",assets); 
var homeRouter = require("./routes/home");
app.use("/",  homeRouter);
var postsRouter = require('./routes/post');
app.use('/post', postsRouter);
var friendsRouter = require('./routes/friends');
app.use('/friends', friendsRouter);

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
  res.render('layouts/error');
});

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

module.exports = app;
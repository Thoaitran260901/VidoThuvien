var createError = require('http-errors');
var express = require('express');
var path = require('path');
var expresslayouts = require('express-ejs-layouts');
var fileUploads = require('express-fileupload'); 
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/Login/login');
var addbookRouter = require('./routes/CRUD/AddSach');
var editbookRouter = require('./routes/CRUD/EditSach');
var trangchinhRouter = require('./routes/trangchinh/trangchinh');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('layout', './layouts/trangchu');
app.set('view engine', 'ejs');
app.use('/image',express.static('image'));
app.use(expresslayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(fileUploads());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/danhsach', indexRouter); //mark
app.use('/login', loginRouter);
app.use('/addbook', addbookRouter);
app.use('/editbook', editbookRouter);
app.use('/',trangchinhRouter); //mark
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
  res.send(err);
});

module.exports = app;

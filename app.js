const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const foodRouter = require('./api/foodRouter');
const categoriesRouter = require('./api/categoriesRouter');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/food', foodRouter);
app.use('/categories', categoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  const error = process.env.NODE_ENV === 'development' ? err : {};
  res.status(err.status || 500);
  res.send({
    message: error.message,
    stack: error.stack
  });
});

module.exports = app;
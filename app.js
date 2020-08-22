var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const createError = require('http-errors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var db = require('./routes/db');
const supplierRouter = require('./routes/supplier_route');
const unitRouter = require('./routes/unit_route');
const categoryRouter = require('./routes/category_route');
const medicineRouter = require('./routes/medicine_route');
const customerRouter = require('./routes/customer_route');
const purchaseRouter = require('./routes/purchase_route');
const batchRouter = require('./routes/batch_route');

var app = express();

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
  
app.use(allowCrossDomain);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/supplier', supplierRouter);
app.use('/unit', unitRouter);
app.use('/category', categoryRouter);
app.use('/medicine', medicineRouter);
app.use('/customer', customerRouter);
app.use('/purchase', purchaseRouter);
app.use('/batch', batchRouter);

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
    res.json({
      message: err.message
    })
  });

module.exports = app;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const createError = require('http-errors');
require('dotenv').config();

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
const salesRouter = require('./routes/sales_route');
const notificationRouter = require('./routes/notification_route');
const onlineOrderRouter = require('./routes/onlineOrders_route');

var app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

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
app.use(bodyParser.json())
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
app.use('/sales', salesRouter);
app.use('/notification', notificationRouter);
app.use('/onlineOrder', onlineOrderRouter);

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

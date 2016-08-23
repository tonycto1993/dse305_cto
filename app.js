 //require("script/function.js");
 
 var express = require('express');
 var path = require('path');
 var favicon = require('serve-favicon');
 var logger = require('morgan');
 var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');
 var https = require('https');
 var nodemailer = require("nodemailer");
 var smtpTransport = require("nodemailer-smtp-transport");
 
 
 //var routes = require('./routes/index');
 //var todos = require('./routes/todos');
 var member = require('./routes/member');
 var search = require('./routes/search');
 var favourite = require('./routes/favourite');
 

 var app = express();
 
 // view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');
 
 // uncomment after placing your favicon in /public
 //app.use(favicon(__dirname + '/public/favicon.ico'));
 app.use(logger('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(cookieParser());
 app.use(express.static(path.join(__dirname, '../public')));
 
 //app.use('/', routes);
 //app.use('/todos', todos);

 app.use('/', member);
 app.use('/register', member);
 app.use('/login', member);
 //app.use('/changePassword', member);
 
 
 app.use('/', search);
 app.use('/searchBooksByKeyword', search);
 app.use('/searchBookByVolumeID', search);
 
 
 app.use('/', favourite);
 app.use('/addToFavouriteList', favourite);
 app.use('/getFavouriteList', favourite);
 app.use('/addNotes', favourite);
 app.use('/removeFavourite', favourite);
 
 
 
 // catch 404 and forward to error handler
 
 app.use(function(req, res, next) {
     var err = new Error('Not Found');
     err.status = 404;
     next(err);
 });
 
 
 // error handlers
 
 // development error handler
 // will print stacktrace
 
 if (app.get('env') === 'development') {
     app.use(function(err, req, res, next) {
         res.status(err.status || 500);
         res.render('error', {
             message: err.message,
             error: err
         });
     });
 }
 
 // production error handler
 // no stacktraces leaked to user
 
 app.use(function(err, req, res, next) {
     res.status(err.status || 500);
     res.render('error', {
         message: err.message,
         error: {}
     });
 });
 
 

module.exports = app;

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})


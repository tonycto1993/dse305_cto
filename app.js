 //require("script/function.js");
 /**require the library**/
 'use strict';
 
 var express = require('express');
 var path = require('path');
 var favicon = require('serve-favicon');
 var logger = require('morgan');
 var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');
 //var https = require('https');
 //var nodemailer = require("nodemailer");
 //var smtpTransport = require("nodemailer-smtp-transport");
 var http           = require( 'http' );
 //var methodOverride = require('method-override');
 
 var member = require('./routes/member');
 var search = require('./routes/search');
 var favourite = require('./routes/favourite');
 var cors = require('cors');
 
 var ParseServer = require('parse-server').ParseServer;



var app = express();

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   // configure stuff here
    app.use(express.static(__dirname + '/'));   
} else {
    app.use(express.static(__dirname + '/'));
}
//app.set( 'port', process.env.PORT || 3001 );


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
//express
    next();
}
app.use(allowCrossDomain);
app.use(cors());

 
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
 //app.use(methodOverride());
 
 app.use('/css', express.static('css'));
 app.use('/js', express.static('js'));
 
 app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/books/booksKeyword.html'));
});
//app.get('/index',function(req,res){
//  res.sendFile(path.join(__dirname+'/views/index.html'));
//});
 /**use to the controller**/
 app.use('/', member);
 app.use('/register', member);
 app.get('/registerMember',function(req,res){
  res.sendFile(path.join(__dirname+'/views/member/register.html'));
});
 app.use('/login', member);
 app.get('/loginMember',function(req,res){
  res.sendFile(path.join(__dirname+'/views/member/login.html'));
});
 app.use('/changePassword', member);
 app.get('/changePasswordMember',function(req,res){
  res.sendFile(path.join(__dirname+'/views/member/changePassword.html'));
});
 
 app.use('/', search);
 app.use('/searchBooksByKeyword', search);
 app.get('/searchKeyword',function(req,res){
  res.sendFile(path.join(__dirname+'/views/books/booksKeyword.html'));
});
 app.use('/searchBookByVolumeID', search);
  app.get('/searchVolumeID/:volumeID',function(req,res){
  res.sendFile(path.join(__dirname+'/views/books/booksVolumeID.html'));
});
 
 
 app.use('/', favourite);
 app.use('/addToFavouriteList', favourite);
 app.use('/getFavouriteList', favourite);
 app.use('/addNotes', favourite);
 app.use('/getNotes', favourite);
 app.use('/removeFavourite', favourite);
 

  app.get('/favouriteList',function(req,res){
  res.sendFile(path.join(__dirname+'/views/favourite/favourite.html'));
});
 
 
 
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
 /*
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
*/

//var PORT = process.env.PORT || 8082;

//create the server
/*
app.server = http.createServer(app);
app.server.listen(8082, function () {

  var host = app.server.address().address
  var port = app.server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});
*/
//http.createServer( app ).listen( 8082, function (){
//  console.log( 'Express server listening on port ' + app.get( 'port' ));
//});

app.set( 'port', process.env.PORT || 3001 );//for heroku
//app.set( 'port', 8081 || 3001 );
http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});
 
 
module.exports = app;



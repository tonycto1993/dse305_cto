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
 app.use(express.static(path.join(__dirname, 'public')));
 
 //app.use('/', routes);
 //app.use('/todos', todos);

 app.use('/', member);
 app.use('/register', member);
 app.use('/login', member);
 app.use('/changePassword', member);
 
 
 app.use('/', search);
 app.use('/searchBooksByKeyword', search);
 app.use('/searchBookByVolumeID', search);
 
 
 app.use('/', favourite);
 app.use('/addToFavouriteList', favourite);
 app.use('/getFavouriteList', favourite);
 app.use('/addNotes', favourite);
 //app.use('/removeFavourite', favourite);
 
 
 // catch 404 and forward to error handler
 
 app.use(function(req, res, next) {
     var err = new Error('Not Found');
     err.status = 404;
     next(err);
 });
 
 
 // error handlers
 
 // development error handler
 // will print stacktrace
 /*
 if (app.get('env') === 'development') {
     app.use(function(err, req, res, next) {
         res.status(err.status || 500);
         res.render('error', {
             message: err.message,
             error: err
         });
     });
 }
 */
 
 // production error handler
 // no stacktraces leaked to user
 /*
 app.use(function(err, req, res, next) {
     res.status(err.status || 500);
     res.render('error', {
         message: err.message,
         error: {}
     });
 });
 */

 
 
 /*
var books = require('google-books-search');

books.search('Professional JavaScript for Web Developers', function(error, results) {
    if ( ! error ) {
        console.log(results);
    } else {
        console.log(error);
    }
});
*/
/*
//search by input keyword
function searchBooksByKeyword(keyword){
    
    if(keyword == null || keyword == '' || keyword.length < 1){
        console.log("keyword should be has content.");
        return false;
    }
    var url = 'https://www.googleapis.com/books/v1/volumes?q='+keyword+'&orderBy=newest&maxResults=5&filter=free-ebooks';
    https.get(url, function(res){
        var body = '';
    
        res.on('data', function(chunk){
            body += chunk;
        });
    
        res.on('end', function(){
            var responseData = JSON.parse(body);
            if(responseData.totalItems == 0){
                console.log("Nothing responese.");
                return false;
            }
            console.log("Got a response: ", responseData);
        });
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });
}

//booksapi-140308      //booksApi     AIzaSyDCGkzawjd9WMfJb553VQEma0PblwY_pQw
//search by volume id of single book
function searchBookByVolumeID(volumeID){
    if(volumeID == null || volumeID == '' || volumeID.length < 1){
        console.log("volumeID should be has content.");
        return false;
    }
    var url = 'https://www.googleapis.com/books/v1/volumes/'+volumeID;//_ojXNuzgHRcC
    var https = require('https');
    //var http = require('http');
    https.get(url, function(res){
        var body = '';
    
        res.on('data', function(chunk){
            body += chunk;
        });
    
        res.on('end', function(){
            var responseData = JSON.parse(body);
            
            if(typeof responseData.error !== 'undefined'){
                if(responseData.error['code'] == 404){
                    console.log("", responseData.error['message']);
                    
                }
                if(responseData.error['code'] == 503){
                    console.log("", responseData.error['message']);
                }
                return false;
            }
            console.log("Got a response: ", responseData);
        });
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });
}

var MemberSchema = new mongoose.Schema({
   user_name: String,
   password: String,
   name: String,
   email: String,
   status: Boolean,
   create_at: {type: Date, default: Date.now()},
});

var Member = mongoose.model('Member', MemberSchema);


function register(user_name, password, name, email){
    var error = 0;
    if(user_name == '' || user_name == null || user_name.length < 1){
        console.log("User name has problem.");
        error = 1;
        return false;
    }
    
    if(password == '' || password == null || password.length < 6){
        console.log("password has problem.");
        error = 2;
        return false;
    }
    
    if(name == '' || name == null || name.length < 3){
        console.log("name has problem.");
        error = 3;
        return false;
    }

    
    if(email == '' || email == null || !validateEmail(email)){
            
        console.log("email has problem.");
        error = 4;
        return false;
    }
    
    Member.find({user_name: user_name}, function(err, data){
        if(err)
            console.log("error : "+err);
        else{ 
            if(Object.keys(data).length === 0){
                console.log('no data');
                Member.create({
                user_name: user_name,
                password: password,
                name: name,
                email: email,
                status: false,
            },function(err, todo){
                if(err)
                    console.log(err);
                else 
                    console.log(todo);
            });
            }else{
                console.log('have data');
                error = 5;
                return false;
            }
        }
    });
    
}

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'gn02519960@gmail.com',
        pass: 'gn45830027'
    }
};

var smtpTransport = nodemailer.createTransport(smtpTransport({
    host : "smtp.gmail.com",
    service: 'Gmail',
    secureConnection : false,
    port: 587,
    auth: {
      XOAuth2: {
        user: smtpConfig.user,
        clientId: smtpConfig.client_id,
        clientSecret: smtpConfig.client_secret,
        refreshToken: smtpConfig.refresh_token,
        accessToken: smtpConfig.access_token,
        timeout: smtpConfig.access_timeout - Date.now()
      }
    }
}));

function testmail(){
    var mailOptions={
        from : "gn02519960@gmail.com",
        to : "gn02519960@gmail.com",
        subject : "Your Subject",
        text : "Your Text",
        html : "HTML GENERATED"
    }
    console.log(mailOptions);
    
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            //res.end("error");
        }else{
            console.log(response.response.toString());
            console.log("Message sent: " + response.message);
            //res.end("sent");
        }
    });
}

function validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var callback = function(err, data){
    if(err) 
      return console.log(err)
    else 
     console.log(data);
};

function login(user_name, password){
    Member.find({user_name: user_name, password: password}, callback);
}


function changePassword(user_name, password, news_password){
    Member.update({user_name: user_name, password: password}, {password: news_password}, {multi: false}, function(err, raw, numberAffected){
    if(err)
        return 
            console.error(err);
        console.log("The raw response from Mongo was", raw);
    
    });
}

var FavouriteSchema = new mongoose.Schema({
   volume_id: String,
   user_name: String,
   notes: String,
   create_at: {type: Date, default: Date.now()},
});

var Favourite = mongoose.model('Favourite', FavouriteSchema);

function addToFavouriteList(volume_id, user_name){
    Favourite.create({
        volume_id: volume_id,
        user_name: user_name,
        notes: '',
    },function(err, todo){
        if(err)
            console.log(err);
        else 
            console.log(todo);
    });
}

function getFavouriteList(user_name){
    Favourite.find({user_name: user_name}, callback);
}

function addNotes(notes, user_name, volume_id){
    Favourite.update({user_name: user_name, volume_id: volume_id}, {notes: notes}, {multi: false}, function(err, raw, numberAffected){
    if(err)
        return 
            console.error(err);
        
        console.log("The raw response from Mongo was", raw);
    
    });
}

function removeFavourite(user_name, volume_id){
    Favourite.remove({user_name: user_name, volume_id: volume_id}, {multi: false}, function(err, raw, numberAffected){
    if(err)
        return 
            console.error(err);
        console.log("The raw response from Mongo was", raw);
    
    });
}
*/

module.exports = app;

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

//searchBooksByKeyword('gsdgf');
//searchBookByVolumeID('_ojXNuzgHRcC');//_ojXNuzgHRcC
//register("gary3", "123456", "ggg", "abc@123.com");
//login('gary','12345');
//addToFavouriteList('_ojXNuzgHRcC', 'gary');
//changePassword('gary','1234','12345');
//getFavouriteList('gary');
//addNotes('test','gary','_ojXNuzgHRcC');
//removeFavourite('gary','_ojXNuzgHRcC');
//testmail();

var express = require('express');
var router = express.Router();

//var mongoose = require('mongoose');
//var member = require('../models/member.js');
var mongoose = require('../models/db.js');
/*
var mongoose = require("mongoose");

mongoose.connect('mongodb://collection:45830027@ds023664.mlab.com:23664/sampledb305cde2016', function(err) {
     if(err) {
         console.log('connection error', err);
     } else {
         console.log('connection successful');
     }
 });
 */
 
var MemberSchema = new mongoose.Schema({
   user_name: String,
   password: String,
   name: String,
   email: String,
   status: Boolean,
   create_at: {type: Date, default: Date.now()},
});

var member = mongoose.model('Member', MemberSchema);


router.get('/', function(req,res,next){
    console.log("tttt");

});


function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

router.post('/register', function(req,res,next){
    var error = 0;
    var user_name = req.body.user_name;
    var password = req.body.password;
    var name = req.body.name;
    var email = req.body.email;
    //console.log(req);
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
    console.log('data no error');
    member.find({user_name: user_name}, function(err, data){
        if(err)
            console.log("error : "+err);
        else{ 
            //console.log("no error : ");
            if(Object.keys(data).length === 0){
                console.log('no data');
                member.create({
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
    
});

var callback = function(err, data){
    if(err) 
      return console.log(err)
    else 
     console.log(data);
};

router.post('/login', function(req,res,next){
    var user_name = req.body.user_name;
    var password = req.body.password;
    member.find({user_name: user_name, password: password}, callback);
});

router.post('/changePassword', function(req,res,next){
    var user_name = req.body.user_name;
    var password = req.body.password;
    var news_password = req.body.news_password;
    member.update({user_name: user_name, password: password}, {password: news_password}, {multi: false}, function(err, raw, numberAffected){
    if(err)
        return 
            console.error(err);
        console.log("The raw response from Mongo was", raw);
    
    });
});


module.exports = router;
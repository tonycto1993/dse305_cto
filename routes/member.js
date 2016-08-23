var express = require('express');
var router = express.Router();

//var mongoose = require('mongoose');
//var member = require('../models/member.js');
var mongoose = require('../models/db.js');
var member = require('../models/member.js');


router.get('/', function(req,res,next){
    console.log("view");
});



function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

router.post('/register', function(req,res,next){
    var error = 0;
    var msg;
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
    //console.log('data no error');
    member.find({user_name: user_name}, function(err, data){
        if(err){
            console.log("error : "+err);
            msg = 'can not find memeber';
        }else{ 
            //console.log("no error : ");
            if(Object.keys(data).length === 0){
                console.log('no data');
                //member.register(user_name, password, name, email);
                
                member.create({
                    user_name: user_name,
                    password: password,
                    name: name,
                    email: email,
                    status: false,
                },function(err, todo){
                    
                    if(err){
                        console.log(err);
                        msg = 'can not register memeber';
                    }else{
                        console.log(todo);
                        msg = 'register memeber successful';
                    }   
                });
            }else{
                console.log('member have data');
                error = 5;
                msg = 'member have data';
                //return false;
            }
        }
        res.setHeader('content-type', 'application/json')
        res.send(res.statusCode, {status: data.status, message: msg})
        res.end()
    });
    
    
});

var callback = function(err, data){
    if(err) 
      return console.log(err)
    else 
      console.log('login ok');
      
    
};

router.post('/login', function(req,res,next){
    var user_name = req.body.user_name;
    var password = req.body.password;
    var msg;
    //console.log('username : ' + user_name + ", password : "+password);
    member.find({user_name: user_name},{password : password}, function(err, data){
        if(err) 
           console.log(err)
        else 
           console.log('login ok');
        //console.log(data);
       if(data == [] || data == null || data == ''){
           msg = "cannot found member";
       }else{
           msg = "member login successful";
       }
       res.setHeader('content-type', 'application/json')
       res.status(res.statusCode).send({status: 1, message: msg})
       res.end()
    });
    

});

router.post('/changePassword', function(req,res,next){
    var user_name = req.body.user_name;
    var password = req.body.password;
    var new_password = req.body.new_password;
    var msg;
    if(password == '' || password == null || password.length < 6){
        console.log("password has problem.");
        msg = 'password should more than 5 characters';
    }else{
        //member.update({user_name: user_name, password: password}, {password: news_password}, {multi: false}, function(err, data, numberAffected){
        member.update({user_name: user_name, password: password}, {password: new_password}, function(err, data, numberAffected){
        if(err) 
            console.error(err);
        else
            console.log("The raw response from Mongo was", data);
        
        
        if(data.nModified > 0){
            msg = "change password successful";
        }else{
            msg = "change password failed";
        }     
            
        res.setHeader('content-type', 'application/json')
        res.status(res.statusCode).send({status: 1, message: msg})
        res.end()
        });
    }
});

router.post('/verifyMember', function(req,res,next){
    var user_name = req.body.user_name;
    var msg;
    //member.update({user_name: user_name, password: password}, {password: news_password}, {multi: false}, function(err, data, numberAffected){
    member.update({user_name: user_name}, {status: true}, function(err, data, numberAffected){
    if(err) 
        console.error(err);
    else
        console.log("The raw response from Mongo was", data);
    
    
    if(data.nModified > 0){
        msg = "verify member successful";
    }else{
        msg = "verify member failed";
    }     
        
    res.setHeader('content-type', 'application/json')
    res.status(res.statusCode).send({status: 1, message: msg})
    res.end()
    });
});


module.exports = router;
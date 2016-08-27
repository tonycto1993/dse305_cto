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

/**register the member**/
router.get('/test', function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("User name = ");
     res.end("yes");
});

router.post('/register', function(req,res,next){
    console.log('--member register--');
    var error = 0;
    var msg;
    var user_name = req.body.user_name;
    var password = req.body.password;
    var name = req.body.name;
    var email = req.body.email;
    //console.log(req);
    if(user_name == '' || user_name == null || user_name.length < 1){// check user_name format
        console.log("User name has problem.");
        error = 1;
        msg = 1;
    }
    
    if(password == '' || password == null || password.length < 6){//check password length should more than 5 characters
        console.log("password has problem.");
        error = 2;
        msg = 2;
    }
    
    if(name == '' || name == null || name.length < 3){//check name length should be more than 3 characters
        console.log("name has problem.");
        error = 3;
        msg = 3;
    }

    
    if(email == '' || email == null || !validateEmail(email)){//check the vaild email format
        console.log("email has problem.");
        error = 4;
        msg = 4
    }
    //console.log('data no error');
    member.find({user_name: user_name}, function(err, data){//find the existing member
        if(err){
            console.log("error : "+err);
            msg = 'can not find memeber';
        }else{ 
            //console.log("no error : ");
            if(Object.keys(data).length === 0){
                console.log('no data');
                /**create member**/
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
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('content-type', 'application/json')
        res.send(res.statusCode, {status: data.status, message: msg, data: data})
        res.end()
    });
    
    
});

var callback = function(err, data){
    if(err) 
      return console.log(err)
    else 
      console.log('login ok');
      
    
};

/**member login**/
router.post('/login', function(req,res,next){
    console.log('--login member--');
    var user_name = req.body.user_name;
    var password = req.body.password;
    var msg;
    //console.log('username : ' + user_name + ", password : "+password);
    member.find({user_name: user_name},{password : password}, function(err, data){//find the member
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
       res.status(res.statusCode).send({status: 1, message: msg, data: data})
       res.end()
    });
    

});
/**change password**/
router.post('/changePassword', function(req,res,next){
    console.log('--change password--');
    var user_name = req.body.user_name;
    var password = req.body.password;
    var new_password = req.body.new_password;
    var msg;
    if(password == '' || password == null || password.length < 6){
        console.log("password has problem.");
        msg = 'password should more than 5 characters';
    }else{
        //member.update({user_name: user_name, password: password}, {password: news_password}, {multi: false}, function(err, data, numberAffected){
        /**update member password**/
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
        res.status(res.statusCode).send({status: 1, message: msg, data: data})
        res.end()
        });
    }
});

/**verify member**/
router.post('/verifyMember', function(req,res,next){
    console.log('--verify member--');
    var user_name = req.body.user_name;
    var msg;
    //member.update({user_name: user_name, password: password}, {password: news_password}, {multi: false}, function(err, data, numberAffected){
    /**update member status**/
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
    res.status(res.statusCode).send({status: 1, message: msg, data: data})
    res.end()
    });
});


module.exports = router;
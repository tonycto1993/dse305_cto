var express = require('express');
var router = express.Router();

//var mongoose = require('mongoose');
//var member = require('../models/member.js');
var mongoose = require('../models/db.js');
var Favourite = require('../models/favourite.js');

router.get('/', function(req,res,next){
    //console.log("tttt");

});

var callback = function(err, data){
    if(err) 
      return console.log(err)
    else 
     console.log(data);
};

router.post('/addToFavouriteList', function(req,res,next){
    console.log('--add book to favourite--');
    var user_name = req.body.user_name;
    var volume_id = req.body.volume_id;
    var notes = req.body.notes;
    var msg = 'start add to fovourite list';
    
    Favourite.find({user_name: user_name}, function(err, data){
        if(err){
            console.log("error : "+err);
            msg = 'can not found member';
        }else{ 
            if(Object.keys(data).length === 0){
                Favourite.create({
                    volume_id: volume_id,
                    user_name: user_name,
                    notes: notes,
                },function(err, todo){
                    if(err){
                        console.log(err);
                        msg = 'can not insert to favourite list';
                    }else{
                        //console.log(todo);
                        msg = 'insert to favourite list successful';
                    }
                });
            }else{
                console.log('favourite have data');
                msg = 'favourite exsiting record';
            //    return false;
            }
        }
        res.setHeader('content-type', 'application/json')
        res.status(res.statusCode).send({status: data.status, message: msg, data: data})
        res.end()
    });
 
});

router.post('/getFavouriteList', function(req,res,next){
    console.log('--get list from favourite--');
    var user_name = req.body.user_name;
    var msg;
    Favourite.find({user_name: user_name}, function(err, data){
        if(err){ 
           console.log(err)
           msg = 'cannot found favourite list';
        }
       console.log(data);
       if(data == [] || data == null || data == ''){
           msg = "no data in favourite list";
       }else{
           msg = "favourite list found successful";
       }
       res.setHeader('content-type', 'application/json')
       res.status(res.statusCode).send({status: 1, message: msg, data: data})
       res.end()
    });

});

router.post('/addNotes', function(req,res,next){
    console.log('--add notes to favourite--');
    var user_name = req.body.user_name;
    var volume_id = req.body.volume_id;
    var notes = req.body.notes;
    var msg;
    Favourite.update({user_name: user_name, volume_id: volume_id}, {notes: notes}, {multi: false}, function(err, data, numberAffected){
        if(err){
            console.error(err);
            msg = 'cannot found favourite list record';
        }else{   
            console.log("add notes from Mongo was", data);
            if(data.nModified > 0){
                msg = 'add notes to favourite list successful';
            }else{
                msg = 'add notes to favourite list failed';
            }
        }
        res.setHeader('content-type', 'application/json')
        res.status(res.statusCode).send({status: 1, message: msg, data: data})
        res.end()
    
    });
});

/*
router.post('/removeFavourite', function(req,res,next){
    console.log('--remove from favourite--');
    var user_name = req.body.user_name;
    var volume_id = req.body.volume_id;
    var msg;
    Favourite.remove({user_name: user_name, volume_id: volume_id}, {multi: false}, function(err, data, numberAffected){
        if(err){
            console.error(err);
            msg = 'cannot found favourite list record';
        }else{
            //console.log("removeFavourite from Mongo was", data);
            if(data.nModified > 0){
                msg = 'remove favourite list successful';
            }else{
                msg = 'remove from favourite list failed';
            }
        }
        res.setHeader('content-type', 'application/json')
        res.status(res.statusCode).send({status: 1, message: msg, data: data})
        res.end()
    
    });
});
*/
router.post('/removeFavourite', function(req,res,next){
    console.log('--remove from favourite--');
    var user_name = req.body.user_name;
    var volume_id = req.body.volume_id;
    var msg;
    Favourite.update({user_name: user_name, volume_id: volume_id}, {multi: false}, function(err, data, numberAffected){
        if(err){
            console.error(err);
            msg = 'cannot found favourite list record';
        }else{   
            console.log("add notes from Mongo was", data);
            if(data.nModified > 0){
                msg = 'remove favourite list successful';
            }else{
                msg = 'remove from favourite list failed';
            }
        }
        res.setHeader('content-type', 'application/json')
        res.status(res.statusCode).send({status: 1, message: msg, data: data})
        res.end()
    
    });
});

module.exports = router;
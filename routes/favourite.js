/**require library**/
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

/**add book to favourite list**/
router.post('/addToFavouriteList', function(req,res,next){
    console.log('--add book to favourite--');
    var user_name = req.body.user_name;
    var volume_id = req.body.volume_id;
    var notes = req.body.notes;
    var msg = 'start add to fovourite list';
    var error = 0;
    var sendData;
    Favourite.find({user_name: user_name, volume_id : volume_id}, function(err, data){//find the favoruite
        sendData = data;
        if(err){
            console.log("error : "+err);
            msg = 'can not found member';
            error = 1;
        }else{ 
            if(Object.keys(data).length === 0){
                /**create the favourite**/
                Favourite.create({
                    volume_id: volume_id,
                    user_name: user_name,
                    notes: notes,
                },function(err, todo){
                    sendData = todo;
                    if(err){
                        error = 2;
                        console.log(err);
                        msg = 'can not insert to favourite list';
                    }else{
                        //console.log(todo);
                        msg = 'insert to favourite list successful';
                    }
                });
            }else{
                //console.log('favourite have data');
                msg = 'favourite exsiting record';
                error = 3;
                //return false;
            }
        }
        res.setHeader('content-type', 'application/json')
        res.status(res.statusCode).send({status: error, message: msg, data: sendData})
        res.end()
    });
});

/**get the favourite from list**/
router.post('/getFavouriteList', function(req,res,next){
    console.log('--get list from favourite--');
    var user_name = req.body.user_name;
    var msg = "start get record from favourite list";
    var error = 0;
    Favourite.find({user_name: user_name}, function(err, data){//find the favoruite
        if(err){ 
           console.log(err)
           msg = 'cannot found favourite list';
           error = 1;
        }
       //console.log(data);
       if(data == [] || data == null || data == ''){
           msg = "no data in favourite list";
           error = 2;
       }else{
           msg = "favourite list found successful";
       }
       res.setHeader('content-type', 'application/json')
       res.status(res.statusCode).send({status: error, message: msg, data: data})
       res.end()
    });
});

/**cadd notes to favourite**/
router.post('/addNotes', function(req,res,next){
    console.log('--add notes to favourite--');
    var user_name = req.body.user_name;
    var volume_id = req.body.volume_id;
    var notes = req.body.notes;
    var msg = "start add notes";
    var error = 0;
    /**update notes to favourite**/
    Favourite.update({user_name: user_name, volume_id: volume_id}, {notes: notes}, {multi: false}, function(err, data, numberAffected){
        if(err){
            console.error(err);
            msg = 'cannot found favourite list record';
            error = 1;
        }else{   
            console.log("add notes from Mongo was", data);
            if(data.nModified > 0){
                msg = 'add notes to favourite list successful';
            }else{
                msg = 'add notes to favourite list failed';
                error = 2
            }
        }
        res.setHeader('content-type', 'application/json')
        res.status(res.statusCode).send({status: error, message: msg, data: data})
        res.end()
    
    });
});

/**cadd notes to favourite**/
router.post('/getNotes', function(req,res,next){
    console.log('--get notes from favourite--');
    var user_name = req.body.user_name;
    var volume_id = req.body.volume_id;
    var msg = "start get notes from favourite list record.";
    var error = 0;
    /**update notes to favourite**/
    Favourite.find({user_name: user_name, volume_id: volume_id}, function(err, data){
        if(err){
            console.error(err);
            msg = 'cannot found notes in favourite list record';
            error = 1;
        }else{   
            msg = 'get notes from favourite list successful';
            
        }
        res.setHeader('content-type', 'application/json')
        res.status(res.statusCode).send({status: error, message: msg, data: data})
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

/**remove favourite**/
router.post('/removeFavourite', function(req,res,next){
    console.log('--remove from favourite--');
    var user_name = req.body.user_name;
    var volume_id = req.body.volume_id;
    var msg = "start to remove favourite";
    var error = 0;
    /**update the favourite for remove**/
    Favourite.remove({user_name: user_name, volume_id: volume_id}, function(err, data){
        if(err){
            console.error(err);
            msg = 'cannot found favourite list record';
            error = 1;
        }else{   
            console.log("add notes from Mongo was", data);
            //if(data.nModified > 0){
                msg = 'remove favourite list successful';
           // }else{
            //    msg = 'remove from favourite list failed';
            //    error = 2;
            //}
        }
        res.setHeader('content-type', 'application/json')
        res.status(res.statusCode).send({status: error, message: msg, data: data})
        res.end()
    
    });
});

module.exports = router;
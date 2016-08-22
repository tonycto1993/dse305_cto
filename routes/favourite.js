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
var FavouriteSchema = new mongoose.Schema({
   volume_id: String,
   user_name: String,
   notes: String,
   create_at: {type: Date, default: Date.now()},
});

var Favourite = mongoose.model('Favourite', FavouriteSchema);

router.get('/', function(req,res,next){
    console.log("tttt");

});

var callback = function(err, data){
    if(err) 
      return console.log(err)
    else 
     console.log(data);
};

router.post('/addToFavouriteList', function(req,res,next){
    var user_name = req.body.user_name;
    var volume_id = req.body.volume_id;
    var notes = req.body.notes;
    Favourite.create({
        volume_id: volume_id,
        user_name: user_name,
        notes: notes,
    },function(err, todo){
        if(err)
            console.log(err);
        else 
            console.log(todo);
    });
});

router.post('/getFavouriteList', function(req,res,next){
    var user_name = req.body.user_name;
    Favourite.find({user_name: user_name}, callback);

});

router.post('/addNotes', function(req,res,next){
    var user_name = req.body.user_name;
    var volume_id = req.body.volume_id;
    var notes = req.body.notes;
    Favourite.update({user_name: user_name, volume_id: volume_id}, {notes: notes}, {multi: false}, function(err, raw, numberAffected){
    if(err)
        return 
            console.error(err);
        
        console.log("The raw response from Mongo was", raw);
    
    });

});

router.post('/removeFavourite', function(req,res,next){
    var user_name = req.body.user_name;
    var volume_id = req.body.volume_id;
    Favourite.remove({user_name: user_name, volume_id: volume_id}, {multi: false}, function(err, raw, numberAffected){
    if(err)
        return 
            console.error(err);
        console.log("The raw response from Mongo was", raw);
    
    });
});

module.exports = router;
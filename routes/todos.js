var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');

router.get('/', function(req,res,next){
    Todo.find(function(err, todos){
        if(err)
            return next(err);
        res.json(todos);
        console.log(todos);
    });
    
});

module.exports = router;
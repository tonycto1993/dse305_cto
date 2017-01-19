var mongoose = require("mongoose");

mongoose.connect('mongodb://tonycto:Ssc26282527@ds117919.mlab.com:17919/cto_305cde', function(err) {
     if(err) {
         console.log('connection error', err);
     } else {
         console.log('connection successful');
     }
 });
 
 module.exports = mongoose;
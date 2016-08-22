var mongoose = require("mongoose");

mongoose.connect('mongodb://collection:45830027@ds023664.mlab.com:23664/sampledb305cde2016', function(err) {
     if(err) {
         console.log('connection error', err);
     } else {
         console.log('connection successful');
     }
 });
 
 module.exports = mongoose;
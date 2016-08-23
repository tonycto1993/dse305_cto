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
 
 var mongoose = require('../models/db.js');

var FavouriteSchema = new mongoose.Schema({
   volume_id: String,
   user_name: String,
   notes: String,
   create_at: {type: Date, default: Date.now()},
});

var Favourite = mongoose.model('Favourite', FavouriteSchema);

module.exports = Favourite;
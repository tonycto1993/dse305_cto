var mongoose = require('../models/db.js');

var FavouriteSchema = new mongoose.Schema({
   volume_id: String,
   user_name: String,
   notes: String,
   create_at: {type: Date, default: Date.now()},
});

var Favourite = mongoose.model('Favourite', FavouriteSchema);

module.exports = Favourite;
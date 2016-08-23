var mongoose = require('../models/db.js');
var MemberSchema = new mongoose.Schema({
   user_name: String,
   password: String,
   name: String,
   email: String,
   status: Boolean,
   create_at: {type: Date, default: Date.now()},
});

var member = mongoose.model('Member', MemberSchema);

var register;

module.exports = member;
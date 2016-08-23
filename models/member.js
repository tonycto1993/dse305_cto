/**create connection to mongoose**/
var mongoose = require('../models/db.js');
var MemberSchema = new mongoose.Schema({
   user_name: String,
   password: String,
   name: String,
   email: String,
   status: Boolean,
   create_at: {type: Date, default: Date.now()},
});
/**create member schema**/
var member = mongoose.model('Member', MemberSchema);

module.exports = member;
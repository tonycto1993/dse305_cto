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
/*
exports.all = function() { 
    var res_data;
  Member.find({}, function(err, data){
        if(err)
            res_data = err;
        else
            res_data = data;
    })
  return res_data;
}


exports.register = function(user_name, password, name, email) {
  member.create({
       user_name: user_name,
       password: password,
       name: name,
       email: email,
       status: false,
  },function(err, todo){
   if(err)
      return false;
   else 
      return true;
  });
}
*/
module.exports = member;
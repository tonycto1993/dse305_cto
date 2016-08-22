var mongoose = require("mongoose");
/*
var TodoSchema = new mongoose.Schema({
   name: String,
   completed: Boolean,
   note: String,
   update_at: {type: Date, default: Date.now()},
});

var Todo = mongoose.model('Todo', TodoSchema);
*/
/*
mongoose.connect('mongodb://collection:45830027@ds023664.mlab.com:23664/sampledb305cde2016', function(err) {
     if(err) {
         console.log('connection error2 ', err);
     } else {
         console.log('connection successful2');
     }
 });
 
 var MemberSchema = new mongoose.Schema({
   user_name: String,
   password: String,
   name: String,
   email: String,
   status: Boolean,
   create_at: {type: Date, default: Date.now()},
});

var Member = mongoose.model('Member', MemberSchema);

var FavouriteSchema = new mongoose.Schema({
   volume_id: String,
   user_name: String,
   notes: String,
   create_at: {type: Date, default: Date.now()},
});

var Favourite = mongoose.model('Favourite', FavouriteSchema);

exports.register = function(user_name, password, name, email) {
  Member.create({
       user_name: user_name,
       password: password,
       name: name,
       email: email,
       status: false,
  },function(err, todo){
   if(err)
      console.log(err);
   else 
      console.log(todo);
  });
}
*/

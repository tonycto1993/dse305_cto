var mongoose = require("mongoose");
mongoose.connect("mongodb://collection:45830027@ds023664.mlab.com:23664/sampledb305cde2016", 
    function(err){
        if(err){
            console.log("connection error", err);
        }else{
            console.log("connection successful.");
        }
});

var TodoSchema = new mongoose.Schema({
   name: String,
   completed: Boolean,
   note: String,
   update_at: {type: Date, default: Date.now()},
});

var Todo = mongoose.model('Todo', TodoSchema);
/*
Todo.create({
    name: 'Demo 2',
    completed: false,
    note: 'first job 2',
},function(err, todo){
    if(err)
        console.log(err);
    else 
        console.log(todo);
});
*/

var callback = function(err, data){
    if(err) 
      return console.log(err)
    else 
     console.log(data);
};
/*
//get all data
Todo.find(function(err,todos){
    if(err) 
        return console.log(err);
    console.log(todos);
});
*/

//Todo.find({completed:true}, callback);
//Todo.find({name: /2/}, callback);

/*
Todo.update({completed: false}, {completed: true}, {multi: true}, function(err, raw, numberAffected){
    if(err)
        return 
            console.error(err);
        console.log("The number of updated document was %d", numberAffected);
        console.log("The raw response from Mongo was", raw);
    
});
*/

Todo.remove({completed: false}, {multi: true}, function(err, raw, numberAffected){
    if(err)
        return 
            console.error(err);
        console.log("The number of updated document was %d", numberAffected);
        console.log("The raw response from Mongo was", raw);
    
});
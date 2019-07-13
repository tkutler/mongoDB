
// SETTTINGS ///

// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var session = require('express-session');
var mongoose = require('mongoose');
// create the express app
var app = express();
app.use(session({
    secret: 'password',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
mongoose.Promise = global.Promise;
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
mongoose.connect('mongodb://localhost/messageboard')

/////////////////////////////////////

//// MODELS ////
var messageSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, "Posts must have a title"], 
    minlength: [3, "must be above 3 characters"]},
  message: {
    type: String, 
    required: [true, "must have message"],
    minlength: [3, "must be above 3 characters"]},
  comments: {
    type: [commentschema], 
   }
   
 }, {timestamps: true})


var commentschema = new mongoose.Schema({
  content: {
    type: String, 
    required: [true, "Post must have a comment longer than 3"], 
    minlength: [3, "must be above 3 characters"]
  },
  name: {
    type: String, 
    required: [true, "must have message"],
    minlength: [3, "must be above 3 characters"]
  }
}, 
{timestamps: true})


mongoose.model('Message', messageSchema);
var Message = mongoose.model('Message');
mongoose.model('Comment', commentschema );
var Comment = mongoose.model('Comment');


app.get('/', function(req, res) {
  Message.find({}, function(err, messages){
    if (err) {
      console.log("error");
    }
    res.render("index", {messages: messages});

  })
  
});
app.post('/message', function(req, res) {
  console.log("POST DATA", req.body);
 
  var message = new Message ({name: req.body.name, message: req.body.message});
 
  message.save(function(err) {
  
    if(err) {
      console.log('something went wrong');
      console.log(err)
    } 
    else {
      console.log('successfully added a message!');
      console.log(message);
      res.redirect("/");
    }
  });
})
app.post('/comment', function (req, res){
  var comment = new Comment ({name: req.body.cname, content: req.body.comment});
  if (comment){
    console.log(comment);
    Message.updateOne ({_id:req.body.mid}, {$push:{comments:comment}}, function(err){
      if (err){
        console.log(err);
      }
      res.redirect("/")
    })
    
  }
  else{ 
 console.log("error")
  }
})
app.listen(8000, function(){
 console.log("listening on port 8000");
})
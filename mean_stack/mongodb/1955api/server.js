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
mongoose.connect('mongodb://localhost/1955_api')
var UserSchema = new mongoose.Schema({
  name: String,
 })
 mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User'); // We are retrieving this Schema from our Models, named 'User'
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
app.get('/', function(req, res) {
  User.find({}, function(err, users){
    if (err) {
      console.log("error");
      res.json({message: "error", error: err})
    }
    else {
      res.json({message: "success", data: users});
    }

  })
  
});
app.get('/new/:name', function(req, res) {
 
  var user = new User({name: req.params.name});
 
  user.save(function(err) {
  
    if(err) {
      console.log('something went wrong',err);
      res.json({message:"error", error: err})
    } 
    else {
      console.log('successfully added a user!');
      console.log(user);
      res.redirect("/");
    }
  });
})
app.get('/remove/:name', function (req, res){
  console.log("in delete route")
  User.remove({name: req.params.name }, function (err){
    if (err){
      console.log(err)
    }
    else {
      res.redirect("/")
    }
  })
})
app.get('/:name', function (req, res){
  User.findOne({name:req.params.name}, function(err,user){
    if (err){
      console.log('error')
    }
    console.log(user)
    res.json({message: "success", data: user});

  })
})
app.listen(8000, function(){
 console.log("listening on port 8000");
})
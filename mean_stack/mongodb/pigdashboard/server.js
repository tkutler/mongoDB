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
mongoose.connect('mongodb://localhost/pig_dashboard')
var UserSchema = new mongoose.Schema({
  name: String,
  age: Number
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
    }
    res.render("index", {users: users});

  })
  
});
app.get('/new', function(req, res) {
 
    res.render("new");

  
});
app.post('/new', function(req, res) {
  console.log("POST DATA", req.body);
 
  var user = new User({name: req.body.name, age: req.body.age});
 
  user.save(function(err) {
  
    if(err) {
      console.log('something went wrong');
    } 
    else {
      console.log('successfully added a user!');
      console.log(user);
      res.redirect("/");
    }
  });
})
app.get('/pig/:id/edit', function (req, res){
  console.log('in route')
  User.find({_id:req.params.id}, function(err,pig){
    if (err) {
      console.log('there is an error')
    }
    console.log(pig)
    res.render("edit",{pig:pig})
  })

})
app.get('/pig/:id', function (req, res){
  User.find({_id:req.params.id}, function(err,pig){
    if (err){
      console.log('error')
    }
    console.log(pig)
    res.render("onepig", {pig:pig})

  })
})
app.post('/pig/:id', function (req,res){
  User.findOne({_id:req.params.id}, function (err,user){
    console.log(req.body);
    user.name = req.body.name;
    user.age = req.body.age;
    user.save(function(err){
      if (err){
        console.log('error')
      }
      res.redirect("/")
    })
  })
  // res.redirect("/")
}) 
app.post('/pig/destroy/:id', function (req,res) {
  console.log('destroy')
  User.remove({_id:req.params.id}, function (err){
    if (err){
      console.log("error")
    }
    res.redirect("/")
  })
  
})


app.listen(8000, function(){
 console.log("listening on port 8000");
})
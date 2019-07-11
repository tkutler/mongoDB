// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var session = require('express-session');
var mongoose = require('mongoose');
// create the express app
var app = express();
const flash = require('express-flash');
app.use(flash());
app.use(session({
    secret: 'password',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
mongoose.connect('mongodb://localhost/quoting_dojo')
var UserSchema = new mongoose.Schema({
  name: String,
  quote: String,
  created_at: Date,
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
app.post('/quote', function(req, res) {
  console.log("POST DATA", req.body);
 
  var user = new User({name: req.body.name, quote: req.body.quote, created_at:new Date()});
 
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
app.get('/quote', function(req, res) {
  User.find({}, function(err, users){
    if (err) {
      console.log("error");
    }
    res.render("quote", {users: users});

  })
  
});
app.post('/quotepage', function(req, res) {
  console.log('in route')
  User.find({}, function(err, users){
    if (err) {
      console.log("error");
    }
    res.render("quote", {users: users});

  })
  
});

app.listen(8000, function(){
 console.log("listening on port 8000");
})
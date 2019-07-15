// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quoting_dojo');
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
// var UserSchema = new mongoose.Schema({
//   name: String,
//   quote: String,
//   created_at: Date,
//  })
// mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
// var User = mongoose.model('User'); // We are retrieving this Schema from our Models, named 'User'
mongoose.Promise = global.Promise;
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
require('./models/quote.js');
require('./config/routes.js')(app);
app.listen(8000, function(){
 console.log("listening on port 8000");
})
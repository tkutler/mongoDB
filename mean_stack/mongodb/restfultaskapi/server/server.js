// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var session = require('express-session');
// var mongoose = require('mongoose');
// create the express app
var app = express();
app.use(session({
    secret: 'password',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.json());
// static conten
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, '..client/views'));
app.set('view engine', 'ejs');
require('./config/mongoose.js');
require('./models/model.js');
require('./config/routes.js')(app);


app.listen(8000, function(){
 console.log("listening on port 8000");
})
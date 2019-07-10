// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var session = require('express-session');
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
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("form");
})
app.post('/result', function (req, res){
  console.log("POST DATA \n\n", req.body)
  //code to add user to db goes here!
  // redirect the user back to the root route. 
   var data = [
     {name: req.body.name},
      {location: req.body.location},
      {language: req.body.language}, 
      {comment: req.body.comment}

  ]
  console.log(data)
  res.render('result', {data: data});
});
app.listen(8000, function() {
 console.log("listening on port 8000");
});
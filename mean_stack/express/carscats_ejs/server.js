
var express = require("express");

// invoke express and store the result in the variable app
var app = express();
app.use(express.static(__dirname + "/static"));
app.get("/cars", function (request, response){
  response.render('cars')  
})
app.get("/cats", function (request, response){
    response.render('cats')  
  })
app.get("/cars/new", function (request, response){
    response.render('form')  
  })
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');
app.listen(8000, function() {
  console.log("listening on port 8000");
})
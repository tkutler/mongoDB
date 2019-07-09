
var express = require("express");

// invoke express and store the result in the variable app
var app = express();
app.use(express.static(__dirname + "/static"));
app.listen(8000, function() {
  console.log("listening on port 8000");
})
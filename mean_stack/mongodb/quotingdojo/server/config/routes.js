const mongoose = require('mongoose');
User = mongoose.model('User');
module.exports = function(app){
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
};
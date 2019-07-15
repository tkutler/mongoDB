const mongoose = require('mongoose');
// const User = mongoose.model('User');
var quotes = require('../controllers/quotes.js');

module.exports = function(app){
  app.get('/', function(req, res) {
    quotes.index(req,res);

  })
    
  app.post('/quote', function(req, res) {
    quotes.create(req,res);

  })
  app.get('/quote', function(req, res) {
    quotes.show(req, res);
  
    })
  
  app.post('/quotepage', function(req, res) {
    quotes.make(req, res);

  })
}

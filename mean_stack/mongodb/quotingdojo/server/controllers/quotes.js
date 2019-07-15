var mongoose = require('mongoose');

// var UserSchema = new mongoose.Schema({
//     name: String,
//     quote: String,
//     created_at: Date,
//    })
// mongoose.model('User', UserSchema);
var User = mongoose.model('User'); 
module.exports = {
    index: function(req, res) {
        User.find({}, function(err, users){
            if (err){
                console.log("error")
            }
            res.render("index", {users: users})
        })
    	
    },
    create: function(req, res) {
        console.log("POST DATA", req.body);
        var user = new User({name: req.body.name, quote: req.body.quote, created_at:new Date()});

        user.save(function(err) {
            if (err) {
                console.log('something went wrong');
            }
            else {
                console.log('succesfully added a user');
                console.log(user);
                res.redirect('/')
            }
        })
    },
    make: function (req, res){
        User.find({}, function(err,users){
            if (err) {
                console.log(err);
            }
            res.render("quote", {users:users})
        })
    },

    show: function(req, res) {
        User.find({}, function(err, users){
            if (err) {
                console.log(err)
            }
            res.render("quote", {users:users})
        })
    	
    }
};





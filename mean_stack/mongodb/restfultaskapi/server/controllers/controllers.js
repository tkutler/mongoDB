var mongoose = require('mongoose');

// var UserSchema = new mongoose.Schema({
//     name: String,
//     quote: String,
//     created_at: Date,
//    })
// mongoose.model('User', UserSchema);
var Tasks = mongoose.model('Tasks'); 
module.exports = {
    index: function(req, res) {
        Tasks.find({}, function(err, tasks){
            if (err){
                console.log("error")
            }
            res.json({message: "success", data:tasks})
        })
    	
    },
    create: function(req, res) {
        Tasks.findOne ({_id: req.params.id}, function (err,task){
            if (err){
                console.log(err);
            }
            else {
                res.json({message: "success", data:task})
            }

        })
    },
    post: function (req, res){
        console.log("POST DATA", req.body);
 
        var tasks = new Tasks(req.body);
        
        tasks.save(function(err,tasks) {
  
            if(err) {
                console.log('something went wrong');
            } 
            else {
                console.log('successfully added a task!');
                console.log(tasks);
                res.json({message: "success", data:tasks});
            }
    });
},
delete: function(req, res) {
    Tasks.remove ({title: req.params.title}, function (err){
        if (err){
            console.log(err)
        }
        else {
            res.redirect('/')
        }
    })
},
   

    put: function(req, res) {
        Tasks.findOne ({title: req.params.title}, function (err,tasks){
            tasks.title = req.body.title;
            tasks.description = req.body.description;
            tasks.save(function(err){
                if (err){
                    console.log(err)
                }
                else{
                    res.redirect("/")
                }
            })
        })
        
        
    	
    }
};
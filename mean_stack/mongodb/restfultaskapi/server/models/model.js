var mongoose = require('mongoose');
const TasksSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: {
      type: String,
      value: false,
    }
  
   }, {timestamps:true});
   mongoose.model('Tasks', TasksSchema);
   const Tasks = mongoose.model('Tasks');

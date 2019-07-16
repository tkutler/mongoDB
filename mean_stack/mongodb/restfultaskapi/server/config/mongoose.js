var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restful_task_api');
mongoose.Promise = global.Promise;
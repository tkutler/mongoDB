var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quoting_dojo');
mongoose.Promise = global.Promise;
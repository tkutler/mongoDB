var mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    quote: String,
    created_at: Date,
   }) 
   mongoose.model('User', UserSchema);
   const User = mongoose.model('User'); 

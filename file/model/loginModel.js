const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for login 
let Login = new Schema({
  username: {
    type: String
  },
  password: {
    type: Number
  }
},{
    collection: 'login'
});

module.exports = mongoose.model('login', Login);
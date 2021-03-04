const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for shoe
let Shoe = new Schema({
  shoe_name: {
    type: String
  },
  shoe_code: {
    type: Number
  }
},{
    collection: 'shoe'
});

module.exports = mongoose.model('Shoe', Shoe);
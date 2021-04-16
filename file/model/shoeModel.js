const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for shoe
let Shoe = new Schema({
  shoe_name: {
    type: String
  },
  shoe_model: {
    type: String
  },
  shoe_code: {
    type: Number
  },
  shoe_color: {
    type: String
  },
  shoe_size: {
    type: Array
  },
  shoe_count: {
    type: Array
  },
  shoe_purchase_date: {
    type: Array
  },
  shoe_sale_date: {
    type: Array
  },
  shoe_cost_buy: {
    type: Array
  },
  shoe_cost_sale: {
    type: Array
  },
  shoe_profit: {
    type: Number
  },
  shoe_image: {
    type: String
  },
  shoe_description: {
    type: String
  }
},{
    collection: 'shoe'
});

module.exports = mongoose.model('shoe', Shoe);
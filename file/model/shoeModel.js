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
    type: Number
  },
  shoe_count: {
    type: Number
  },
  shoe_purchase_date: {
    type: String
  },
  shoe_sale_date: {
    type: String
  },
  shoe_cost_buy: {
    type: Number
  },
  shoe_cost_sale: {
    type: Number
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
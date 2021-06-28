const express = require('express');
const shoeRoutes = express.Router();

let Shoe = require('../model/shoeModel');

// create a new doqument
shoeRoutes.route('/add').post(function (req, res) { 
  let shoe = new Shoe(req.body);
  shoe.save()
        .then(() => res.json({
            message: "shoe in added successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "unable to save to database"
        })) 
});

//get information
shoeRoutes.route('/').get(function (req, res) {
    Shoe.find(function(err, shoes){
    if(err){
      console.log(err);
    }
    else {
      res.json(shoes);
    }
  });
});

// Defined edit route
shoeRoutes.route('/edit/:shoe_code').get(function (req, res) {
  let id = req.params.shoe_code;
  Shoe.find(id, function (err, shoe){
      res.json(shoe);
  });
});

// update 
shoeRoutes.route('/update').post(function (req, res) { 
  Shoe.find(function(err, shoes){
    if(err){
      console.log(err);
    }
    else {
      shoes.map(index => {
        if ( (index.shoe_code == req.body.shoe_code) ){
          index.shoe_name= req.body.shoe_name;
          index.shoe_model= req.body.shoe_model;
          index.shoe_code= req.body.shoe_code;
          index.shoe_color= req.body.shoe_color;
          index.shoe_size= req.body.shoe_size;
          index.shoe_count= req.body.shoe_count;
          index.shoe_purchase_date=req.body.shoe_purchase_date;
          index.shoe_sale_date=req.body.shoe_sale_date;
          index.shoe_cost_buy= req.body.shoe_cost_buy;
          index.shoe_cost_sale= req.body.shoe_cost_sale;
          index.shoe_profit= req.body.shoe_profit;
          index.shoe_image= req.body.shoe_image;
          index.shoe_description= req.body.shoe_description;

          index.save().then(shoe => {
            res.json('Update complete');
          })
          .catch(err => {
            res.status(400).send("unable to update the database");
          });
        }
      })
    }
  });
  /*shoe.shoe_name= req.body.shoe_name;
  shoe.shoe_model= req.body.shoe_model;
  shoe.shoe_code= req.body.shoe_code;
  shoe.shoe_color= req.body.shoe_color;
  shoe.shoe_size= req.body.shoe_size;
  shoe.shoe_count= req.body.shoe_count;
  shoe.shoe_purchase_date=req.body.shoe_purchase_date;
  shoe.shoe_sale_date=req.body.shoe_sale_date;
  shoe.shoe_cost_buy= req.body.shoe_cost_buy;
  shoe.shoe_cost_sale= req.body.shoe_cost_sale;
  shoe.shoe_profit= req.body.shoe_profit;
  shoe.shoe_image= req.body.file;
  shoe.shoe_description= req.body.shoe_description;

  shoe.save().then(shoe => {
    res.json('Update complete');
  })
  .catch(err => {
    res.status(400).send("unable to update the database");
  });*/
   
});

// Defined delete | remove | destroy route
shoeRoutes.route('/delete/:id').get(function (req, res) {
    Shoe.findByIdAndRemove({_id: req.params.id}, function(err, shoe){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = shoeRoutes;
const express = require('express');
const shoeRoutes = express.Router();

let Shoe = require('../model/shoeModel');

// create a new doqument
shoeRoutes.route('/add').post(function (req, res) {
  console.log("+++++++++++++++++++++++++ add new shoe +++++++++++++++++++++++++",req.body) 
  let shoe = new Shoe(req.body);
  console.log(shoe)
  shoe.save()
        .then(() => res.json({
            message: "Created account successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account"
        })) 
});

//get information
shoeRoutes.route('/').get(function (req, res) {
    console.log("+++++++++++++++++++++++++ get information +++++++++++++++++++++++++") 
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
  console.log("+++++++++++++++++++++++++ edit +++++++++++++++++++++++++") 
  let id = req.params.shoe_code;
  console.log("+++++++++++++++++++++++++",id)
  Shoe.find(id, function (err, shoe){
      res.json(shoe);
      console.log("+++++++++++++++++++++++++",shoe)
  });
});

//  Defined update route
shoeRoutes.route('/update/:id').post(function (req, res) {
  console.log("+++++++++++++++++++++++++ update +++++++++++++++++++++++++") 
    Shoe.findById(req.params.id, function(err, shoes) {
    if (!shoes)
      res.status(404).send("data is not found");
    else {
        shoe.shoe_name = req.body.shoe_name;
        shoe.shoe_code = req.body.shoe_code;

        shoe.save().then(shoe => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
shoeRoutes.route('/delete/:id').get(function (req, res) {
    Shoe.findByIdAndRemove({_id: req.params.id}, function(err, shoe){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = shoeRoutes;
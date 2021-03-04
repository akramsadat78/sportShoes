const express = require('express');
const shoeRoutes = express.Router();

// Require shoe model in our routes module
let Shoe = require('../model/shoe');

// Defined store route
shoeRoutes.route('/add').post(function (req, res) {
  let shoe = new Shoe(req.body);
  shoe.save()
    .then(shoe => {
      res.status(200).json({'shoe': 'shoe in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
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
shoeRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Shoe.findById(id, function (err, shoe){
      res.json(shoe);
  });
});

//  Defined update route
shoeRoutes.route('/update/:id').post(function (req, res) {
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
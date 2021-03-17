const express = require('express');
const loginRoutes = express.Router();

// Require shoe model in our routes module
let Login = require('../model/loginModel');

// Defined store route
loginRoutes.route('/add').post(function (req, res) {
  console.log("+++++++++++++++++++++++++ add new login +++++++++++++++++++++++++",req.body) 
  /*res.send(
    `I received : ${req.body.post}`,
  );*/
  /*res.send(
    `I received : ${req.body.post.username} and ${ req.body.post.password}`,
  );
*/
  let login = new Login(req.body);
  console.log(login)
  login.save()
        .then(() => res.json({
            message: "Created account successfully"
        }))
        /*.catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account"
        }))  */ 
});

// Defined get data(index or listing) route
loginRoutes.route('/').get(function (req, res) {
    Login.find(function(err, logins){
    if(err){
      console.log(err);
    }
    else {
      res.json(logins);
    }
  });
});

// Defined edit route
loginRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Login.findById(id, function (err, login){
      res.json(login);
  });
});

//  Defined update route
loginRoutes.route('/update/:id').post(function (req, res) {
    Login.findById(req.params.id, function(err, logins) {
    if (!logins)
      res.status(404).send("data is not found");
    else {
        login.username = req.body.username;
        login.password = req.body.password;

        login.save().then(login => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
loginRoutes.route('/delete/:id').get(function (req, res) {
    Login.findByIdAndRemove({_id: req.params.id}, function(err, login){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = loginRoutes;
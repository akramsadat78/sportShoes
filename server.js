const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*add*/
const mongoose = require('mongoose');
const config = require('./file/database/mongo');
const shoeRoute = require('./file/operation/route');

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useFindAndModify:false,
  useCreateIndex:true,
  useUnifiedTopology:true
}).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use('/shoe', shoeRoute);
/*
startDatabase().then(async () => {
  console.log("startDatabase")
}
);

add().then(async () => {
  console.log("add")
}
);*/

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});



if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
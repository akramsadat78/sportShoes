const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./file/database/mongo');
const shoeRoute = require('./file/operation/route');
const loginRoute = require('./file/operation/loginRout');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.use('/login', loginRoute);

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
/*const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./file/database/mongo');
const shoeRoute = require('./file/operation/route');
const loginRoute = require('./file/operation/loginRout');
const path = require('path');

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useFindAndModify:false,
  useCreateIndex:true,
  useUnifiedTopology:true
}).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log("hello server");
app.use('/shoe', shoeRoute);

app.get('/login', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.use('/login', loginRoute);


// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));*/
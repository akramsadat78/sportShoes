const mongoose = require('mongoose');

let database = null;

const url = "mongodb+srv://akram:a96243040@cluster0.agvdo.mongodb.net/Shoe-sales-management?retryWrites=true&w=majority"

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const MongoClient = require('mongodb').MongoClient;

module.exports = {
    DB: "mongodb+srv://akram:a96243040@cluster0.agvdo.mongodb.net/Shoe-sales-management?retryWrites=true&w=majority"

}
/*const uri =  "mongodb+srv://akram:a96243040@cluster0.agvdo.mongodb.net/Shoe-sales-management?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
     useNewUrlParser: true,
     useFindAndModify:false,
     useCreateIndex:true, 
     useUnifiedTopology: true
    });

client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
});
    
const mongoose = require('mongoose');

let database = null;
//const  connection  = null;



async function startDatabase() {
    const uri =  "mongodb+srv://akram:a96243040@cluster0.agvdo.mongodb.net/Shoe-sales-management?retryWrites=true&w=majority"
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify:false,
      useCreateIndex:true,
      useUnifiedTopology:true
    }).then(res => console.log("Connected to DB"))
    .catch(err => console.log(err))
    database = mongoose.connection;
    //database.on('error',console.error.bind(console,'MongoDB connection error'))
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
  }

  async function add() {
      console.log("+++++++++++++++++++++++++++++")
  }
/*
  async function add() {
    try {
        
        const dbName  = connection.db("Shoe-sales-management");
         console.log("Connected correctly to server for add");
        
         const col = dbName.collection("people");
         // Construct a document                                                                                                                                                              
         /*let personDocument = {
             "name": { "first": "arezo", "last": "vali" },
             "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
             "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000
         }*//*
         let personDocument = {
            "name":"ali"
        }
         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);
        } catch (err) {
         console.log(err.stack);
     }
 
}
*/
  
  /*
// Replace the following with your Atlas connection string 
const url = "mongodb+srv://akram:a96243040@cluster0.agvdo.mongodb.net/Shoe-sales-management?retryWrites=true&w=majority"
console.log("==============================================")
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

/*
 // The database to use
 const dbName = "Shoe-sales-management";
 const database  = client.db(dbName);

 
 async function search() {
    try {
         await client.connect();
         console.log("Connected correctly to db for search ");
         
         const people = database.collection("people");

         const query = { name:  'ali'};
         const arezo = await people.findOne(query);

         console.log(arezo);
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}


//run().catch(console.dir);
*/
/*
module.exports = {
    add,
    getDatabase,
    startDatabase,
    
  };
  exports.getDatabase = getDatabase
  exports.startDatabase = startDatabase
  exports.add =add*/
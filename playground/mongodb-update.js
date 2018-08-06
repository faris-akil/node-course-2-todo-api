//========Example of destructuring object===============
// var user = {name: "andrew", age: 25};
// var {age} = user;
// console.log(user);
// console.log(age);

// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

var obj = new ObjectID();
console.log(obj);


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err){
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  // db.collection("Todos").findOneAndUpdate({
  //   _id : new ObjectID("5b53703f6e761c14080a98df")
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // })

  db.collection("Users").findOneAndUpdate({
    _id: new ObjectID("5b537194f9022e1cec5068ac")
  }, {
    $set: {
      name: "Faris",
    },
    $inc: {
      age: 1
    }
  },{
      returnOriginal: false
  }).then((result) => {
    console.log(result);
  })
  // db.close();
});

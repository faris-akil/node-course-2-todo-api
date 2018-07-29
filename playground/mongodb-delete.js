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

  // deleteMany
  // db.collection("Todos").deleteMany({text: "Eat lunch"}).then((result) => {
  //   console.log(result);
  // });
  // db.collection("Users").deleteMany({name: "Akil"}).then((result) => {
  //   console.log(result);
  // });
  // deleteOne
  // db.collection("Todos").deleteOne({text: "Eat lunch"}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection("Todos").findOneAndDelete({text: "Eat lunch"}).then((result) => {
  //   console.log(result);
  // })
  db.collection("Users").findOneAndDelete({_id: new ObjectID("5b53719c94bbab2e30eea86f")}).then((result) => {
    console.log(result);
  })
  // db.close();
});

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

  // db.collection("Todos").find(
  //   {_id : new ObjectID("5b5d428fdd235d16e4f74f48")}
  // ).toArray().then((docs) => {
  //   console.log("Todos : ");
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, (err) => {
  //   console.log("Unable to fetch todos, ", err);
  // });

  // db.collection("Todos").find(
  //   {}
  // ).count().then((docs) => {
  //   console.log("Count : ", docs);
  // }, (err) => {
  //   console.log("Unable to fetch todos, ", err);
  // });

  db.collection("Users").find({name: "Akil"}).toArray().then((docs) =>{
    console.log("User : ");
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) =>{
    console.log("Unable to fetch users: ", err);
  })
  // db.close();
});

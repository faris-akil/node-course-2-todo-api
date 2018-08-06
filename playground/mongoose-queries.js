const {ObjectID} = require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

var id = "5b67bc456920cd15007c3c788";
var user_id = "5b67c29d1229053c88151738";

// 
// if(!ObjectID.isValid(id)) {
//   console.log("ID not valid");
// }
// Todo.find({
//   completed: false,
// }).then((todos) => {
//   console.log("Todos", todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if(!todo){
//     console.log("Id not found");
//   } else {
//     console.log(todo);
//   }
// });
//
// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log("Id not found");
//   }
//   console.log("Todo By Id", todo);
// }).catch((e) => console.log(e));

User.findById(user_id).then((user) => {
  if(!user){
    console.log("User not found");
  } else {
    console.log(user);
  }
})

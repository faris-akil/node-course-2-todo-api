var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo.js");
var {User} = require("./models/user.js");
var {ObjectID} = require("mongodb");

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post("/api/todos", (req,res) => {
    // console.log(req.body);
    var todo = new Todo({
      text: req.body.text
    });

    todo.save().then((doc) => {
      res.send(doc);
    },(e) => {
      res.status(400).send(e);
    });
});

app.get("/api/todos", (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos: todos})
  }, (e)=> {
    res.status(400).send(e);
  })
});

app.get("/api/todos/:id", (req,res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if(!todo){
      console.log("todo not found");
      return res.status(404).send([]);
    } else{
      return res.send({todo});
    }
  },(e) => {
    return res.status(400).send(e);
  })
})

app.listen(port, () => {
  console.log(`Start on port number ${port}`);
})

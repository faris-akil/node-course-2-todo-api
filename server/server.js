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

  if(!ObjectID.isValid(id)){
    return res.status(404).send({message: "Id not Valid"});
  }

  Todo.findById(id).then((todo) => {
    if (!todo){
      return res.status(404).send({message: "Todo not found"});
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send({message: "Error occured"});
  });
});

app.delete("/api/todos/:id", (req,res) => {
  var id=req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send({message: "id not valid"});
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(404).send({message: "todo not found"});
    }
    if(todo === null){
      return res.status(400).send({message: "todo already deleted"});
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.listen(port, () => {
  console.log(`Start on port number ${port}`);
})
